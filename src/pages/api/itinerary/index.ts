import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import axios from 'axios'

export default validateRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
    switch (req.method) {
        case 'POST':
          // Note: Use Zod or similar library to validate req body
          let query

          const comma = req.body.destinations.indexOf(',')

          if (comma !== -1) {
            query = req.body.destinations.substring(0, comma)
          } else {
            query = req.body.destinations
          }

          const unsplashPic = await axios.get(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=1`)

          try {
            const data = await prisma.itinerary.create({
              data: {
                name: req.body.itineraryName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                destinations: req.body.destinations,
                likes: 0,
                coverPhoto: unsplashPic.data[0].urls.full,
                status: req.body.status,
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