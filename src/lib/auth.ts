import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerAuthSession } from "../server/common/get-server-auth-session"

export const validateRoute = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getServerAuthSession({ req, res });

        if (session) {
            //@ts-ignore
            return handler(req, res, session.profile.id);
        }

        res.status(401).json({ error: 'NOT AUTHORIZED.'})
    }
}