import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { User } from "@clerk/nextjs/dist/api";
import { Webhook } from "svix";
import { buffer } from "micro";
import { prisma } from "../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UserInterface {
    email_addresses: {
        email_address: string;
        id: string;
    }[];
    primary_email_address_id: string;
    first_name: string;
    last_name: string;
    id: string;
    attributes: User;
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
  
type Event = {
    data: { id: string; attributes: UserInterface };
    object: "event";
    type: EventType;
};

type EventType = "user.created";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

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

  if (eventType === "user.created") {
    const { id, attributes }: { id: string; attributes: UserInterface } = evt.data;

    if (attributes) {
      const emailObject = attributes?.email_addresses?.find((email) => {
        return email.id === attributes.primary_email_address_id;
      });

      if (!emailObject) {
        return res.status(400).json({});
      }

      await prisma.profile.create({
        data: {
            clerkId: id,
            bio: '',
            distanceUnits: 'MILES',
            dateFormat: 'MONTH',
            timeFormat: 'TWELVE',
            commentsNotification: true,
            remindersNotification: true,
            collaboratorJoinedNotification: true,
        },
      });
    }

    console.log(`User ${id} was ${eventType}`);
    res.status(201).json({ message: 'Successfully created profile'});
  }
}

