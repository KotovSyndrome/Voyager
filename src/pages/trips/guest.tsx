import React, { useEffect, useState } from 'react'
import GuestItinerary from '../../components/guestItinerary'
import Map from '../../components/map'
import { useRouter } from 'next/router'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { SlNote } from 'react-icons/sl'
import Loader from '../../components/Loader'
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
interface IGuestTripDay {
  date: string
  activities: IActivity[]
  id: number
}

interface IGuestItinerary {
  coverPhoto: string
  destinations: string
  endDate: string
  likes: number
  name: string
  public: boolean
  startDate: string
  tripDays: IGuestTripDay[]
}

const guest = () => {
  const [itineraryData, setItineraryData] = useState<IGuestItinerary>()
  const [viewState, setViewState] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const guestData = JSON.parse(sessionStorage.getItem("guestItinerary") || '')

    if (!guestData) {
      router.push('/')
    }

    setItineraryData(guestData)    
  }, [])

  // update itineraryData in session storage with useEffect every time it's updated on client

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
      <div className={`${viewState && 'hidden'} lg:block 2xl:col-start-1 2xl:col-end-1 shadow-lg shadow-gray-600 z-[999]`}>
        {itineraryData ? <GuestItinerary itineraryData={itineraryData!} setItineraryData={setItineraryData} /> : <Loader/>}
      </div>
      <div className={`${!viewState && 'hidden'} lg:block 2xl:col-start-2 2xl:col-end-4`}>
        <Map />
      </div>

      <button onClick={() => setViewState((prev) => !prev)} className='lg:hidden z-[1000] fixed bottom-4 right-4 p-3 text-sm transition-colors duration-300 rounded-full shadow-xl text-violet-100 bg-violet-500 hover:bg-violet-600 shadow-violet-500'>{viewState ? <SlNote size={27}/> : <FaMapMarkedAlt size={27} />}</button>
    </div>
  )
}

export default guest