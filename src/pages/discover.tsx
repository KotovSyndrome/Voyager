import React, { useState } from 'react'
import ItineraryCard from '../components/itineraryCard'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

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

interface IProfile {
  username: string
}

interface IItinerary {
  coverPhoto: string
  destinations: string[]
  endDate: Date
  id: number
  likes: number
  name: string
  profile: IProfile
  profileId: number
  public: boolean
  startDate: Date
}

const discover = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<IItinerary[]>([])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    
    console.log('query: ', query.toLowerCase())
    
    const searchCall = await axios.post('/api/search', {destination: query.toLowerCase()})

    setQuery('')

    setSearchResults(searchCall.data)

    console.log({searchCall})
  }


  return (
    <>
      <div className='w-4/6 m-auto mt-20'>
        <div className='flex flex-col items-center'>
          <h3 className='text-3xl text-center'>Explore destinations or see where other's have traveled</h3>

          <form onSubmit={handleSearch} className='relative flex justify-center w-full'>
            <input value={query} onChange={(e) => setQuery(e.target.value)} type={'text'} placeholder={'Find your dream getaway!'} className='inline-block p-2 rounded-full w-1/3 mt-10 outline-none'/>
            {/* Use state to disable button briefly after submit(1 second?) */}
            <button disabled={false} type='submit' className='absolute right-[34.2%] top-[3.1rem] cursor-pointer'><BiSearch size={20}/></button>
          </form>
          <div className='w-full mt-5'>
            <p className='text-center text-lg'>Popular destinations</p>

            <div className='flex justify-center space-x-6 text-slate-50 mt-3'>
              {pop.map(p => <div key={p} className='bg-indigo-300 py-1 px-4 rounded-lg cursor-pointer hover:scale-125 duration-300 '>{p}</div>)}
            </div>
          </div>

          <div className='grid grid-cols-4 gap-5 mt-10 pb-10'>
            {searchResults.length ? (searchResults.map(s => {
                return <ItineraryCard 
                          key={s.id}
                          name={s.name}
                          destinations={s.destinations.join(', ')}
                          profile={s.profile}
                          likes={s.likes}
                          startDate={s.startDate}
                          endDate={s.endDate}
                          coverPhoto={s.coverPhoto}
                          id={s.id}
                        />
            })) : (islands.map(island => {
              return <ItineraryCard 
                        key={island} 
                        name={'Romantic Getway'} 
                        destinations={'Neverland, Foreverland'} 
                        profile={ {username: 'user123'} } 
                        likes={2178} 
                        startDate={new Date()}
                        endDate={new Date()}
                        coverPhoto={''}
                        id={1}
                      />
                })
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default discover