import React, { useState } from 'react'
import ItineraryCard from '../components/itineraryCard'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'
import LayoutWrapper from '../components/layoutWrapper'
import { type GetServerSideProps } from 'next'
import { prisma } from '../server/db/client'

const pop = [
  'Hawaii',
  'Brazil',
  'Australia',
  'Switzerland'
]

const islands = [
  'Bali, Indonesia',
  'Honolulu, Hawaii',
  'Aruba',
  'The Bahamas',
  'Jamaica',
  'Neverland',
  'Somewhere',
  'Okay island'
]

interface IItinerary {
  coverPhoto: string
  destinations: string
  endDate: string
  id: number
  likes: number
  name: string
  profile: { username: string }
  profileId: number
  public: boolean
  startDate: string
}

interface IServerData {
  initialItineraries: IItinerary[]
}


const discover = ({ initialItineraries }: IServerData) => {
  const [query, setQuery] = useState('')
  const [initialData, setInitialData] = useState<IItinerary[]>()
  const [searchResults, setSearchResults] = useState<IItinerary[]>([])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    
    const searchCall = await axios.post('/api/search', {destination: query})

    console.log('Search results: ', searchCall.data)

    setQuery('')

    setSearchResults(searchCall.data)
  }



  return (
    <LayoutWrapper>
      <div className='mt-20'>
        <div className='flex flex-col items-center'>
          <h3 className='text-3xl text-center'>Explore destinations and see where other's have traveled</h3>

          <form onSubmit={handleSearch} className='w-full flex justify-center'>
            <div className='relative  w-full md:w-3/4 lg:w-1/2'>
              <input value={query} onChange={(e) => setQuery(e.target.value)} type={'text'} placeholder={'Find your dream getaway!'} className='text-black inline-block px-3 py-2 rounded-full w-full mt-10 outline-none border-0 focus:ring-0 focus:ring-offset-0'/>
              {/* Use state to disable button briefly after submit(1 second?) */}
              <button disabled={false} type='submit' className='absolute right-2.5 bottom-2.5 cursor-pointer text-black'><BiSearch size={20}/></button>
            </div>
          </form>

          <div className='w-full mt-5'>
            <p className='text-center text-lg'>Popular destinations</p>

            <div className='flex justify-start custom1:justify-center space-x-6 text-slate-50 mt-3 overflow-x-auto md:overflow-visible'>
              {pop.map(p => <div key={p} className='bg-indigo-300 py-1 px-4 rounded-lg cursor-pointer hover:scale-125 duration-300 '>{p}</div>)}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-10 pb-10'>
            {searchResults.length ? (searchResults.map(s => {
                return <ItineraryCard 
                          key={s.id}
                          name={s.name}
                          destinations={s.destinations}
                          profileName={s.profile.username}
                          likes={s.likes}
                          startDate={s.startDate}
                          endDate={s.endDate}
                          coverPhoto={s.coverPhoto}
                          id={s.id}
                        />
            })) : (initialItineraries.map(itin  => {
              return <ItineraryCard 
                        key={itin.id} 
                        name={itin.name} 
                        destinations={itin.destinations} 
                        profileName={itin.profile.username} 
                        likes={itin.likes} 
                        startDate={itin.startDate}
                        endDate={itin.endDate}
                        coverPhoto={''}
                        id={itin.id}
                      />
                })
              )
            }
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default discover

export const getServerSideProps: GetServerSideProps = async () => {
  const initialItineraries = await prisma.itinerary.findMany({
    take: 20,
    include: {
      profile: {
        select: {
          username: true,
        }
      }
    }
  })

  console.log('--------Itinitail Itineraries: ', initialItineraries)

  return { 
    props: { initialItineraries: JSON.parse(JSON.stringify(initialItineraries)) } 
  }
} 