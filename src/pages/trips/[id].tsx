import React from 'react'
import SplitLayout from '../../components/splitLayout'
import Itinerary from '../../components/itinerary'
import Map from '../../components/map'
import { prisma } from '../../server/db/client'
import { type GetServerSideProps } from 'next'

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
  tripDays: ITripDay
}

interface ITripDay {
  id: number,
  date: Date
  itineraryId: number
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
        id: Number(query.id),
      },
      include: {
        TripDay: {
          include: {
            activities: true,
          }
        }
      }
    });
    itineraryData = data;
  } catch (e) {
    console.error(e);
  }
  return { 
    props: JSON.parse(JSON.stringify(itineraryData)) 
  }
  
}