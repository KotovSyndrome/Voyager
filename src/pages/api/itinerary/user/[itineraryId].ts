import { prisma } from "../../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";

export default validateRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse,
  profileId: number
): Promise<void> {
    if (req.method === 'GET') {
        try {           
            const data = await prisma.itinerary.findFirst({
              where: {
                profileId: profileId,
                id: Number(req.query.itineraryId),
              },
              include: {
                tripDays: {
                  include: {
                    activities: {
                      orderBy: {
                        startTime: 'asc'
                      }
                    }
                  }
                }
              }
            })
        
            res.status(200).json(data)
          } catch (e) {
            console.error(e);
            res.status(500).json({
              error: {
                code: 'server_error',
                message: 'An error occurred while fetching the specific itinerary',
              },
            });
        }
    } else {
        res.status(501).json({
            error: {
              code: 'method_unknown',
              message: 'This endpoint only responds to GET',
            },
        });
    }
} )

