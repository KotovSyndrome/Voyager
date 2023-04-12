import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { clerkClient } from "@clerk/nextjs/server";


export default validateRoute(async function (
    req: NextApiRequest,
    res: NextApiResponse,
    userId: string
  ): Promise<void> {
      if (req.method === 'PUT') {
        const user = userId ? await clerkClient.users.getUser(userId) : null;

            try {
              await prisma.itinerary.update({
                where: {
                    id: req.body.itineraryId
                },
                data: {
                    profile: {
                        connect: {
                            clerkId: userId
                        }
                    },
                    creator: user?.username || user?.firstName
                }
              })
        
              res.status(201).json({message: 'Successfully connected itinerary.'});
            } catch (e) {
              console.error(e);
              res.status(500).json({
                error: {
                  code: 'server_error',
                  message: 'An error occurred while posting data.',
                },
              });
            }

        }  else {
            res.status(501).json({
              error: {
                code: 'method_unknown',
                message: 'This endpoint only responds to PUT requests.',
              },
            })
        }
    }
) 