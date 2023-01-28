import React from 'react'
import SplitLayout from '../../components/splitLayout'
import Itinerary from '../../components/itinerary'
import Map from '../../components/map'
import { prisma } from '../../server/db/client'
import { type GetServerSideProps } from 'next'

interface IActivity {
  city: string
  contactInfo: string
  country: string
  endTime: Date
  id: number
  name: string
  note: string
  photo: string | null
  postalCode: string
  startTime: Date
  street: string
  tripDayId: number
}
interface ITripDay {
  activities: IActivity[] | []
  date: Date
  id: number
  itineraryId: number
}

interface IItineraryData {
  coverPhoto?: string
  destinations: string[]
  endDate: Date
  id: number
  likes: number
  name: string
  public: boolean
  profileId: number
  startDate: Date
  tripDays: ITripDay[]
}


const tripPage = (itineraryData: IItineraryData) => {

  return (
    <SplitLayout leftChildren={<Itinerary itin={itineraryData} />} rightChildren={<Map />}/>
  )
}

export default tripPage

export const getServerSideProps: GetServerSideProps = async ({query}) => {

  let itineraryData;

  try {           
    const data = await prisma.itinerary.findUnique({
      where: {
        id: Number(query.itineraryId),
      },
      include: {
        tripDays: {
          include: {
            activities: true,
          }
        }
      }
    });
    itineraryData = data;


    console.log('itineraryData in trips/[id] :', itineraryData)

  } catch (e) {
    console.error(e);
  }
  return { 
    props: JSON.parse(JSON.stringify(itineraryData)) 
  }
  
  // if no itineraries found, redirect to plan?
}