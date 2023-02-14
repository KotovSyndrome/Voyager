import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { GetServerSideProps } from 'next'
import LayoutWrapper from '../../components/layoutWrapper'
import MonthContainer from '../../components/monthContainer'

interface IItineraryData {
  coverPhoto: string | null
  destinations: string[]
  endDate: Date
  id: number
  likes: number
  profileId: number
  public: boolean
  startDate: Date
  name: string
}
interface IServerProps {
  itineraryData: IItineraryData[]
}

interface INoData {
  noItins: boolean
}

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

const trips = (serverProps: IServerProps | INoData) => {
    const [toggle, setToggle] = useState(false)
    const router = useRouter()

    // useEffect(() => {
    //    check if any itineraries are in localStorage (guest user)
    // }, [])


 
  // This isolates all of the months and thier corresponding years that trips occur in. 
  // We need this because we need to dynamically render the months and years, and then the respective itineraries to those dates. 
  // The result in itineraryMonths looks like this: [[month, year], [month, year]].     

  let itineraryMonths: any = []
  
  if ("itineraryData" in serverProps) {
    for (const itin of serverProps.itineraryData) {
      let start = new Date(itin.startDate)

      let startMonth = start.getMonth()
      let startYear = start.getFullYear()

      if (itineraryMonths.length === 0) {
        itineraryMonths.push([startMonth, startYear])
      }
      
      // Making sure to not pass in duplicates. Either year or month has to be different. I.E. August 2022, August 2023
      for (let [month, year] of itineraryMonths) {
        if (month !== startMonth || startYear !== year) {
          itineraryMonths.push([startMonth, startYear])
        }
      }
    }
  }


  return (
    <LayoutWrapper>
      <div className='relative h-full'>
            <h2 className='text-center text-4xl mt-16'>Your Trips</h2>

            <div className='flex flex-col items-center'>
                <p className='text-3xl mt-8'>
                    <span onClick={() => setToggle(!toggle)} className={`${!toggle && 'underline underline-offset-8 decoration-black'} cursor-pointer`}>Upcoming</span>  |  <span onClick={() => setToggle(!toggle)} className={`${toggle && 'underline underline-offset-8 decoration-black'} cursor-pointer`}>Past</span>
                </p>
                <button onClick={() => router.push('/trips/plan')} className='bg-indigo-300 text-slate-50 px-8 py-2 rounded-md mt-7 hover:bg-indigo-500'>Plan trip <span className='inline-block text-md'><FaPlane/></span></button>
            </div>

            {"itineraryData" in serverProps ? (
                itineraryMonths.map((mon: any, i: number) => {
                    return <MonthContainer key={i} startMonth={mon[0]} startYear={mon[1]} itineraries={serverProps.itineraryData} />
                })
            ) : (
              <h2 className='text-center text-xl mt-32 w-full col-start-1 md:col-end-2 lg:col-end-3 xl:col-end-4'>You don't have any upcoming trips. Now's the perfect time to plan for a getaway!</h2>
            )}
      </div>
    </LayoutWrapper>
  )
} 

export default trips

interface IProfile {
  id: number
  bio: string
  username: string
  distanceUnits: string
  dateFormat: string
  timeFormat: string
  commentsNotification: boolean
  remindersNotification: boolean
  collaboratorJoinedNotification: boolean
}
interface IUser {
  email: string
  id: string
  image: string
  name: string
}

interface ISession {
  expires: Date
  user: IUser
  profile: IProfile
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  
  const session: ISession | null = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      props: { noItins: true }
    }
  }

  let data;

  try {
    const dbResponse = await prisma.itinerary.findMany({
      where: {
        profileId: session.profile.id,
      },
      orderBy:{
        startDate: 'asc'
      }
    })
    data = dbResponse;

    console.log({data});

    if (data.length) {
      return { props: { itineraryData: JSON.parse(JSON.stringify(data)) } }
    }
  } catch (e) {
    console.error(e);
  }

  // signed in but have no itineraries
  return { props: { noItins: true } }
  
}