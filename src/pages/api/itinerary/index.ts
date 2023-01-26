import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import { BsThreeDots } from "react-icons/bs";

export default validateRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
    switch (req.method) {
        case 'POST':
          // Note: Use Zod or similar library to validate req body
          try {
            const data = await prisma.itinerary.create({
              data: {
                name: req.body.itineraryName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                destinations: req.body.destinations,
                likes: 0,
                tripDays: {
                  create: req.body.days.map((d: Date) => ({
                    date: d
                  }))
                },
                public: req.body.isPublic,
                profile: {
                  connect: { id: req.body.profileId },
                }
              }
              // include: {
              //   tripDays: true
              // }
            })
            
            res.status(201).json(data);
          } catch (e) {
            console.error(e);
            res.status(500).json({
              error: {
                code: 'server_error',
                message: 'An error occurred while posting data.',
              },
            });
          }
          break;
        default:
          res.status(501).json({
            error: {
              code: 'method_unknown',
              message: 'This endpoint only responds to POST',
            },
          });
          break;
      }
} )