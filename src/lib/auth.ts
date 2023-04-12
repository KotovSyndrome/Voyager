import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { getServerAuthSession } from "../server/common/get-server-auth-session"
import { getAuth } from "@clerk/nextjs/server"

export const validateRoute = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = getAuth(req);

        if (userId) {
            return handler(req, res, userId);
        }

        res.status(401).json({ error: 'NOT AUTHORIZED.'})
    }
}