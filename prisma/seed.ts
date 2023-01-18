import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { users, itineraries, tripDays,} from './seedData'


async function main() {
    await Promise.all(users.map( async (user) => {
        return prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                image: user.image,
                profile: {
                    create: {
                        bio: 'I love to travel to far away places. Check out my itineraries to learn about awesome places you can visit for cheap!',
                        username: 'TravelLover423',
                        distanceUnits: 'MILES',
                        dateFormat: 'MONTH',
                        timeFormat: 'TWELVE',
                        commentsNotification: true,
                        remindersNotification: true,
                        collaboratorJoinedNotification: true,
                    },
                }
            }
        })
    })) 

    await Promise.all(itineraries.map( async (itin, i) => {
        return prisma.itinerary.create({
            data: {
                name: itin.name,
                startDate: itin.startDate,
                endDate: itin.endDate,
                likes: itin.likes,
                public: itin.public,
                destinations: itin.destinations,
                profile: {
                    connect: { id: i + 1}
                },
                tripDays: {
                    create: tripDays.map(trip => ({
                        date: trip.date,
                        activities: {
                            createMany: {
                                data: [
                                    {
                                        name: 'City Skyline',
                                        startTime: new Date(),
                                        endTime: new Date(),
                                        contactInfo: '925-925-9259',
                                        note: 'Cool place',
                                        street: '29',
                                        postalCode: '89432',
                                        city: 'Gotham',
                                        country: 'USA', 
                                    },
                                    {
                                        name: 'Dinner',
                                        startTime: new Date(),
                                        endTime: new Date(),
                                        contactInfo: '925-925-9259',
                                        note: 'Very cozy',
                                        street: '138',
                                        postalCode: '89532',
                                        city: 'Gotham',
                                        country: 'USA', 
                                    },
                                ]
                            }
                        }
                    }))
                },

                comments: {
                    createMany: {
                        data: [
                            {
                                profileId: 1,
                                text: 'This is amazing, thank you for creating this! Looks like a great trip'
                            },
                            {
                                profileId: 1,
                                text: 'Very cool'
                            },
                            {
                                profileId: 1,
                                text: 'This trip sucks bro'
                            },
                            {
                                profileId: 1,
                                text: 'Man this is so terrible. Stay away from any of these places.'
                            }
                        ]
                    }
                }
            }
        })
    }))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })