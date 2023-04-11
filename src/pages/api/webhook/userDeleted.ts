import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import { Webhook } from "svix";
import { buffer } from "micro";
import { prisma } from "../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
  
type Event = {
    data: UserDeletedData
    object: "event";
    type: EventType;
};

type EventType = "user.deleted";

const webhookSecret: string = process.env.WEBHOOK_SECRET_USER_DELETED || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);

  let evt: Event | null = null;

  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }

  // Handle the webhook
  const eventType: EventType = evt.type;

  if (eventType === "user.deleted") {
    if (evt.data) {
      await prisma.profile.delete({
        where: {
            clerkId: evt.data.id,
        },
      });
    }

    res.status(201).json({ message: 'Successfully deleted profile'});
  }
}

interface UserDeletedData {
  deleted: boolean,
  id: string,
  object: string
}