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
    data: User;
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

  console.log('evt.data :', evt.data)

  if (eventType === "user.created") {
    // const { id, attributes }: { id: string; attributes: UserInterface } = evt.data;

    // console.log('Attributes: ', attributes)

    if (evt.data) {
        console.log('Hit attributes block')

      const emailObject = evt.data?.emailAddresses?.find((email) => {
        return email.id === evt?.data.primaryEmailAddressId;
      });

      if (!emailObject) {
        return res.status(400).json({});
      }

      await prisma.profile.create({
        data: {
            clerkId: evt.data.id,
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

    console.log(`User ${evt.data.id} was ${eventType}`);
    res.status(201).json({ message: 'Successfully created profile'});
  }
}

