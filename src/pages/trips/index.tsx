import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import TripCard from '../../components/tripCard'
import axios from 'axios'
import { itineraries } from '../../../prisma/seedData'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { NextApiRequest, NextApiResponse } from 'next'

const trips = (profileWithItineraries: []) => {
    const [toggle, setToggle] = useState(false)
    const router = useRouter()

  console.log('profileWithItineraries: ', profileWithItineraries);

  return (
    <div className='relative w-4/6 m-auto'>
        <h2 className='text-center text-4xl mt-16'>Your Trips</h2>

        <div className='flex justify-center relative'>
            <p className='text-3xl mt-8'>
                <span onClick={() => setToggle(!toggle)} className={`${!toggle && 'underline underline-offset-8 decoration-cyan-600'} cursor-pointer`}>Upcoming</span>  |  <span onClick={() => setToggle(!toggle)} className={`${toggle && 'underline underline-offset-8 decoration-cyan-600'} cursor-pointer`}>Past</span>
            </p>
            <button onClick={() => router.push('/trips/plan')} className='bg-sky-300 text-slate-50 px-8 py-2 rounded-md absolute top-7 right-1 hover:bg-sky-500'>Plan trip <span className='inline-block text-md'><FaPlane/></span></button>
        </div>

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={1} />

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={2}/>

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={3}/>
    </div>
  )
} 

export default trips

interface IServerProps {
  req: NextApiRequest
  res: NextApiResponse
}

export const getServerSideProps = async ({req, res}: IServerProps) => {
  
  const session = await unstable_getServerSession(req, res, authOptions);

  console.log('session in getServerSideProps: ', session);

  let profileWithItineraries;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: "clcso4o9g0000px8lf4rst0rj",
      },
      include: {
        profile: {
          include: {
            itineraries: {
              include: {
                tripDays: {
                  include: {
                    activities: true,
                  }
                }
              }
            }
          }
        }
      }
    })
    profileWithItineraries = data;
    console.log('profileWithItineraries', profileWithItineraries);
  } catch (e) {
    console.error(e);
  }

  return { props: JSON.parse(JSON.stringify(profileWithItineraries)) }
  
}