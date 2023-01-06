import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerAuthSession } from "../server/common/get-server-auth-session"

export const validateRoute = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getServerAuthSession({ req, res });

        if (session) {
            return handler(req, res)
        }

        res.status(401).json({ error: 'NOT AUTHORIZED.'})
    }
}