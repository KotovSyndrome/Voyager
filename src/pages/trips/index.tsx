import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import TripCard from '../../components/tripCard'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { GetServerSideProps } from 'next'

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

const trips = (serverProps: IServerProps | INoData) => {
    const [toggle, setToggle] = useState(false)
    const router = useRouter()

    // useEffect(() => {
    //    check if any itineraries are in localStorage (guest user)
    // }, [])



  return (
    <div className='h-full'>
      <div className='relative w-4/6 m-auto '>
          <h2 className='text-center text-4xl mt-16'>Your Trips</h2>

          <div className='flex justify-center relative'>
              <p className='text-3xl mt-8'>
                  <span onClick={() => setToggle(!toggle)} className={`${!toggle && 'underline underline-offset-8 decoration-black'} cursor-pointer`}>Upcoming</span>  |  <span onClick={() => setToggle(!toggle)} className={`${toggle && 'underline underline-offset-8 decoration-black'} cursor-pointer`}>Past</span>
              </p>
              <button onClick={() => router.push('/trips/plan')} className='bg-sky-300 text-slate-50 px-8 py-2 rounded-md absolute top-7 right-1 hover:bg-sky-500'>Plan trip <span className='inline-block text-md'><FaPlane/></span></button>
          </div>

          { "itineraryData" in serverProps ? (
              serverProps.itineraryData.map(itin => {
                return <TripCard key={itin.id} title={itin.name} startDate={new Date(itin.startDate)} endDate={new Date(itin.endDate)} collaborators={['Jason', 'Chris', 'Henry']} id={itin.id} bgImage={''}/>
              })
          ) : (
            <h2 className='text-center text-xl mt-32'>You don't have any upcoming trips. Now's the perfect time to plan for a getaway!</h2>
          )}
      </div>
    </div>
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