import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { GetServerSideProps } from 'next'
import LayoutWrapper from '../../components/LayoutWrapper'
import { Tab } from '@headlessui/react'
import TabPanelContainer from '../../components/TabPanelContainer'
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";

interface IItineraryData {
  coverPhoto: string | null
  destinations: string
  endDate: string
  id: number
  likes: number
  profileId: number
  public: boolean
  startDate: string
  name: string
}
interface IServerProps {
  itineraryData: IItineraryData[]
}

interface INoData {
  noItins: boolean
}

interface IItinerariesMap {
  [key: string]: IItineraryData[]
}

  // Don't really know what the filter does in this case, tested with and without and couldn't notice a difference.
  // The boolean object always evaluates to true when passed in a conditional statement so nothing will get filetered here?
  // Was in the headless ui demo code
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const filters =['CURRENT', 'UPCOMING', 'PAST']

const trips = (serverProps: IServerProps | INoData) => {
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
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-full xl:w-1/2 mx-auto">
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
                    <TabPanelContainer itinerariesByDate={itinerariesByDate} selectedFilter={filters[selectedIndex]!} selectedIndex={selectedIndex}/>
                  ) : (
                      <h2 className='text-center text-xl mt-32 w-full'>{`You don't have any ${filters[selectedIndex]?.toLocaleLowerCase()} trips. Now's the perfect time to plan for a getaway!`}</h2>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      props: { ...buildClerkProps(ctx.req), noItins: true }
    }
  }

  // const profile = await prisma.profile.findUnique({ where: { clerkId: userId }})

  let data;

  try {
    const dbResponse = await prisma.itinerary.findMany({
      where: {
        profileId: userId,
      },
      orderBy:{
        startDate: 'asc'
      }
    })
    data = dbResponse;

    if (data.length) {
      return { props: { ...buildClerkProps(ctx.req), itineraryData: JSON.parse(JSON.stringify(data)) } }
    }
  } catch (e) {
    console.error(e);
  }

  // signed in but have no itineraries
  return { props: { ...buildClerkProps(ctx.req), noItins: true } }
  
}