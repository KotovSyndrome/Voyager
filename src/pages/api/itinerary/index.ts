import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
import requestIp from 'request-ip'
import { getAuth } from "@clerk/nextjs/server";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
  
): Promise<void> {
    switch (req.method) {
        case 'POST':
          // Note: Use Zod or similar library to validate req body
          console.log('Route hit')

          const { userId } = getAuth(req)
      
          let query

          const comma = req.body.destinations.indexOf(',')

          if (comma !== -1) {
            query = req.body.destinations.substring(0, comma)
          } else {
            query = req.body.destinations
          }

          let unsplashPic 
          
          try {
            const data = await axios.get(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=1`)
            unsplashPic =  data.data[0].urls.full
          } catch (error) {
            console.error(error)
            unsplashPic = 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81QpJ5K1BrL._AC_UF894,1000_QL80_.jpg'
          }
          
          
          console.log({unsplashPic})

          try {
            let data

            if (userId) {
              data = await prisma.itinerary.create({
                data: {
                  name: req.body.itineraryName,
                  startDate: req.body.startDate,
                  endDate: req.body.endDate,
                  destinations: req.body.destinations,
                  likes: 0,
                  coverPhoto: unsplashPic,
                  tripDays: {
                    create: req.body.days.map((d: Date) => ({
                      date: d
                    }))
                  },
                  public: req.body.isPublic,
                  profile: {
                    connect: { clerkId: userId },
                  }
                }
              })
            } else {
              data = await prisma.itinerary.create({
                data: {
                  name: req.body.itineraryName,
                  startDate: req.body.startDate,
                  endDate: req.body.endDate,
                  destinations: req.body.destinations,
                  likes: 0,
                  coverPhoto: unsplashPic,
                  tripDays: {
                    create: req.body.days.map((d: Date) => ({
                      date: d
                    }))
                  },
                  public: req.body.isPublic,
                  ipAddress: requestIp.getClientIp(req)
                }
              })
            }
            
            
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
} 