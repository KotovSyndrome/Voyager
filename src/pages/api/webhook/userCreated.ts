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
    data: UserData;
    object: "event";
    type: EventType;
};

type EventType = "user.created";

const webhookSecret: string = process.env.WEBHOOK_SECRET_USER_CREATED || "";

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
    if (evt.data) {
      const emailObject = evt.data?.email_addresses?.find((email) => {
        return email.id === evt?.data.primary_email_address_id;
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

    res.status(201).json({ message: 'Successfully created profile'});
  }
}

export interface UserData {
    backup_code_enabled:      boolean;
    banned:                   boolean;
    birthday:                 string;
    created_at:               number;
    email_addresses:          EmailAddress[];
    external_accounts:        ExternalAccount[];
    external_id:              null;
    first_name:               string;
    gender:                   string;
    id:                       string;
    image_url:                string;
    last_name:                null;
    last_sign_in_at:          null;
    object:                   string;
    password_enabled:         boolean;
    phone_numbers:            any[];
    primary_email_address_id: string;
    primary_phone_number_id:  null;
    primary_web3_wallet_id:   null;
    private_metadata:         Metadata;
    profile_image_url:        string;
    public_metadata:          Metadata;
    totp_enabled:             boolean;
    two_factor_enabled:       boolean;
    unsafe_metadata:          Metadata;
    updated_at:               number;
    username:                 string;
    web3_wallets:             any[];
}

export interface EmailAddress {
    email_address: string;
    id:            string;
    linked_to:     null[];
    object:        string;
    reserved:      boolean;
    verification:  null[];
}

export interface ExternalAccount {
    approved_scopes:   string;
    avatar_url:        string;
    email_address:     string;
    first_name:        string;
    id:                string;
    identification_id: string;
    label:             null;
    last_name:         string;
    object:            string;
    provider:          string;
    provider_user_id:  string;
    public_metadata:   Metadata;
    username:          string;
    verification:      null[];
}

export interface Metadata {
}