import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";


export default validateRoute(async function (
    req: NextApiRequest,
    res: NextApiResponse,
    profileId: number
  ): Promise<void> {
      if (req.method === 'PUT') {
            try {
                console.log('profileID in connect route: ', profileId)

              await prisma.itinerary.update({
                where: {
                    id: req.body.itineraryId
                },
                data: {
                    profile: {
                        connect: {
                            id: profileId
                        }
                    }
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