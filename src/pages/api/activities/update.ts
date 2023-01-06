import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { prisma } from '../../../server/db/client'

export default validateRoute( async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        const { activityId, activityName, activityStartTime, activityEndTime, activityContactInfo, activityNote, activityStreet, activityPostalCode, activityCity, activityCountry } = req.body

        try {       
            await prisma.activity.update({
                where: { id: activityId },
                data: { 
                    name: activityName,
                    startTime: activityStartTime,
                    endTime: activityEndTime,
                    contactInfo: activityContactInfo,
                    note: activityNote,
                    street: activityStreet,
                    postalCode: activityPostalCode,
                    city: activityCity,
                    country: activityCountry
                 },
            })

            res.status(200).json({ message: 'Activity successfully updated'})
        } catch (error) {
            console.error(error)
            res.status(304).json({ error: 'The resource was not modified, try again.'})
        }


    } else {
        res.status(405).send('Invalid HTTP method. Only PATCH requests are allowed to this route')
    }
})


