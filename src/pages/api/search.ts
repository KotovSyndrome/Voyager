import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../server/db/client'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

    try {
        const compareTodayDate = new Date()

        const data = await prisma.itinerary.findMany({
            where: { 
                destinations: {
                    contains: req.body.destination,
                    mode: 'insensitive',
                },
                public: true,
                endDate: {
                    lt: new Date(`${compareTodayDate.getMonth() + 1} ${compareTodayDate.getDate()} ${compareTodayDate.getFullYear()}`)
                  }
            },
            include: {
                profile: {
                    select: {
                        username: true
                    }
                }
            },
        })

        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'There was an error processing the request.' })
    }
}