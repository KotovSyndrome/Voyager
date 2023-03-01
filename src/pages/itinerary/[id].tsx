import React, { useState } from 'react'
import ViewItinerary from '../../components/viewItinerary'
import Map from '../../components/map'
import { prisma } from '../../server/db/client'
import { type GetServerSideProps } from 'next'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { SlNote } from 'react-icons/sl'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'

interface IActivity {
    city: string
    contactInfo: string
    country: string
    endTime: string
    id: number
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: string
    street: string
    tripDayId: number
  }
  interface ITripDay {
    activities: IActivity[] | []
    date: Date
    id: number
    itineraryId: number
  }

  interface IProfile {
    username: string
    id: number
  }
  
  interface IItineraryData {
    coverPhoto?: string
    destinations: string
    endDate: Date
    id: number
    likes: number
    name: string
    public: boolean
    profileId: number
    startDate: Date
    tripDays: ITripDay[]
    profile: IProfile
  }

const ItineraryPage = (itineraryData: IItineraryData) => {
    const [viewState, setViewState] = useState(false)

    return (
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
        <div className={`${viewState && 'hidden'} lg:block 2xl:col-start-1 2xl:col-end-1 shadow-lg shadow-gray-600 z-[999]`}>
          <ViewItinerary itin={itineraryData} />
        </div>
        <div className={`${!viewState && 'hidden'} lg:block 2xl:col-start-2 2xl:col-end-4`}>
          <Map />
        </div>
  
        <button onClick={() => setViewState((prev) => !prev)} className='lg:hidden z-[1000] fixed bottom-4 right-4 p-3 text-sm transition-colors duration-300 rounded-full shadow-xl text-violet-100 bg-violet-500 hover:bg-violet-600 shadow-violet-500'>{viewState ? <SlNote size={27}/> : <FaMapMarkedAlt size={27} />}</button>
      </div>
    )
}

export default ItineraryPage

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
    let itineraryData;
  
    try {           
      const data = await prisma.itinerary.findUnique({
        where: {
          id: Number(query.id),
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
          },
          profile: {
            select: {
              username: true,
              id: true
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