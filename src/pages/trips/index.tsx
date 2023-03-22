import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { GetServerSideProps } from 'next'
import LayoutWrapper from '../../components/layoutWrapper'
import MonthContainer from '../../components/monthContainer'
import { Tab } from '@headlessui/react'

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
  profilePic: string
}

interface INoData {
  noItins: boolean
}

interface IItinerariesMap {
  [key: string]: IItineraryData[]
}


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const filters =['CURRENT', 'UPCOMING', 'PAST']

const trips = (serverProps: IServerProps | INoData) => {
    // const [tripStatusFilter, setTripStatusFilter] = useState('ACTIVE')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [itinerariesByDate, setItinerariesByDate] = useState<IItinerariesMap>({})
    const router = useRouter()

 
  // Filters itineraries by thier dates. Ex. '1-2023' => [itin1, itin2, ...etc]   
  useEffect(() => {
    if ("itineraryData" in serverProps) {
      const itinerariesMap: IItinerariesMap = {}


      for (const itin of serverProps.itineraryData) {
        const start = new Date(itin.startDate)
  
        const startMonth = start.getMonth()
        const startYear = start.getFullYear()  

        if (itinerariesMap[`${startMonth}-${startYear}`]) {
          itinerariesMap[`${startMonth}-${startYear}`]!.push(itin)
        } else {
          itinerariesMap[`${startMonth}-${startYear}`] = [itin]  
        }
      }

      setItinerariesByDate(itinerariesMap)
    }

  }, [])


  return (
    <LayoutWrapper>
      <div className='relative'>
            <h2 className='text-center text-4xl mt-16 mb-8'>Your Trips</h2>
            

            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-1/2 mx-auto">
                {filters.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <div className='flex justify-center'>
                <button onClick={() => router.push('/trips/plan')} className=' bg-indigo-300 text-slate-50 px-10 py-2 rounded-md mt-8 hover:bg-indigo-500'>Plan trip <span className='inline-block text-md'><FaPlane/></span></button>
              </div>
              <Tab.Panels className="mt-2">
                {filters.map(filter => {
                  return (<Tab.Panel key={filter}>
                  {"itineraryData" in serverProps && Object.keys(itinerariesByDate).length ? (
                    Object.keys(itinerariesByDate).map(date => {
                      return <MonthContainer key={date} startMonth={date.length === 6 ? date.substring(0,1) : date.substring(0,2)} startYear={date.substring(2)} itineraries={itinerariesByDate[date]} profilePic={serverProps.profilePic} selectedIndex={selectedIndex}/>
                    })
                  ) : (
                      <h2 className='text-center text-xl mt-32 w-full'>You don't have any upcoming trips. Now's the perfect time to plan for a getaway!</h2>
                  )}
                  </Tab.Panel>)
                })}
              </Tab.Panels>
            </Tab.Group>

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

    if (data.length) {
      return { props: { itineraryData: JSON.parse(JSON.stringify(data)), profilePic: session.user.image } }
    }
  } catch (e) {
    console.error(e);
  }

  // signed in but have no itineraries
  return { props: { noItins: true } }
  
}