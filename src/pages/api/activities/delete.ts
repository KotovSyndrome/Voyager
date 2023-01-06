import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { prisma } from '../../../server/db/client'

export default validateRoute( async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        
        try {
            await prisma.activity.delete({
                where: { id: req.body.activityId },
            })

            res.status(200).json({ message: 'Successfully deleted resource'})
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'There was a problem deleting the resource' })
        }

    } else {
        res.status(405).send('Invalid HTTP method. Only DELETE requests are allowed to this route')
    }
})