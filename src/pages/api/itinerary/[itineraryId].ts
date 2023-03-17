import { prisma } from "../../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";

export default validateRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
    switch (req.method) {
        case 'PUT':

          try {           
            const data = await prisma.itinerary.update({
              where: {
                id: Number(req.query.itineraryId),
              }, 
              data: {
                // Update itinerary
              }
            })

            res.status(200).json(data)
          } catch (e) {
            console.error(e);
            res.status(500).json({
              error: {
                code: 'server_error',
                message: 'An error occurred while updating the itinerary.',
              },
            });
          }
          break;
        case 'DELETE':
          const data = await prisma.itinerary.delete({
            where: {
              id: Number(req.query.itineraryId),
            }
          })
          res.status(204).json({
            message: "Resource successfully deleted",
          })
          break;
        default:
        res.status(501).json({
          error: {
            code: 'method_unknown',
            message: 'This endpoint only responds to GET, PUT, DELETE',
          },
        });
      }
} )