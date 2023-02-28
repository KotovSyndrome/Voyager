import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerAuthSession } from "../server/common/get-server-auth-session"

export const validateRoute = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getServerAuthSession({ req, res });
        // console.log('session on the backend: ', session);
        if (session) {
            return handler(req, res, session.user?.id);
        }

        res.status(401).json({ error: 'NOT AUTHORIZED.'})
    }
}