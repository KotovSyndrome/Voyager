import React, { Dispatch, SetStateAction} from 'react'
import format from 'date-fns/format';
import Image from 'next/image'
import GuestTripDay from '../components/guestTripDay'

interface IActivity {
    city: string
    contactInfo: string
    country: string
    endTime: string | null
    id: string
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: string | null
    street: string
    tripDayId: number
  }
  interface IGuestTripDay {
    date: string
    activities: IActivity[]
    id: number
  }

  interface IItineraryData {
    coverPhoto: string
    destinations: string
    endDate: string
    likes: number
    name: string
    public: boolean
    startDate: string
    tripDays: IGuestTripDay[]
  }
  
  interface IGuestItinerary {
    itineraryData: IItineraryData
    setItineraryData: Dispatch<SetStateAction<IItineraryData | undefined>>
  }

  const guestItinerary = ({ itineraryData, setItineraryData }: IGuestItinerary) => {

  return (
    <div className='bg-blue-100 shadow-xl shadow-black min-h-screen'>
        <Image src={itineraryData.coverPhoto} alt='Itinerary cover' width={300} height={200} priority={true} className='w-full h-80' />

        <div className='absolute top-20 left-4'>
        <p className='text-2xl text-slate-50'>{itineraryData.name}</p>
        <p>{itineraryData.destinations}</p>
        <p>{format(new Date(itineraryData.startDate), 'MMM d, yyyy')} - {format(new Date(itineraryData.endDate), 'MMM d, yyyy')}</p>
        {/* <p className='text-right mt-7'>Username & Collaborators</p> */}
        </div>

        <div className='w-11/12 md:w-10/12 lg:w-11/2 mx-auto'>
            <div className='bg-inherit w-full mt-5 flex'>
                <div className='grid grid-cols-1 divide-y divide-white text-black w-full'>
                {itineraryData.tripDays.map((day) => {
                    return <GuestTripDay key={day.id} date={new Date(day.date)} activities={day.activities} tripDayId={day.id} itineraryData={itineraryData} setItineraryData={setItineraryData}/>
                })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default guestItinerary