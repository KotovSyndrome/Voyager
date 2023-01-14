import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../server/db/client'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

    try {
        const data = await prisma.itinerary.findMany({
            where: { 
                destinations: {
                    has: req.body.destination,
                },
                public: true
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