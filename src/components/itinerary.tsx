import React, { useState } from 'react'
import TripDay from './tripDay'
import format from 'date-fns/format';

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

interface IItineraryData {
  itin: {
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
  }
}

const itinerary = ({itin}: IItineraryData) => {

  return (
    <div className='bg-blue-100 shadow-xl shadow-black'>

          <div className='bg-demoBG bg-cover bg-center p-3'>
              <p className='text-2xl text-slate-50'>{itin.name}</p>
              <p>{itin.destinations}</p>
              <p>{format(new Date(itin.startDate), 'MMM d, yyyy')} - {format(new Date(itin.endDate), 'MMM d, yyyy')}</p>
              {/* @ts-ignore */}
              <p className='text-right mt-7'>Username & Collaborators</p>
          </div>

        <div className='w-11/12 md:w-10/12 lg:w-11/2 mx-auto'>
            <div className='bg-inherit w-full mt-5 flex'>
                <div className='grid grid-cols-1 divide-y divide-white text-black w-full'>
                  {itin.tripDays.map((day) => {
                    return <TripDay key={day.id} date={new Date(day.date)} activities={day.activities} tripDayId={day.id}/>
                  })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default itinerary
