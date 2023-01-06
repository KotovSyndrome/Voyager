import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { prisma } from '../../../server/db/client'

export default validateRoute( async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        //  tripDay ID
        const day = req.body.tripDayId

        const { activityName, activityStartTime, activityEndTime, activityContactInfo, activityNote, activityStreet, activityPostalCode, activityCity, activityCountry } = req.body

        try {
            await prisma.activity.create({
                data: {
                    name: activityName,
                    startTime: activityStartTime,
                    endTime: activityEndTime,
                    contactInfo: activityContactInfo,
                    note: activityNote,
                    street: activityStreet,
                    postalCode: activityPostalCode,
                    city: activityCity,
                    country: activityCountry,
                    tripDay: {
                        connect: { id: day }
                    }
                },
            })

            res.status(201).json({ message: 'successfully created new activity'})
        } catch(e) {
            console.log(e)
            res.status(400).json({ error: 'The resource could not be created. Try again.'})
        }

    } else {
        res.status(405).send('Invalid HTTP method. Only POST requests are allowed to this route')
    }
})