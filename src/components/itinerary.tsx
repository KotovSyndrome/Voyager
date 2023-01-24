import React, { useState } from 'react'
import TripDay from './tripDay'
import format from 'date-fns/format';

interface IItineraryProps {
  itin: IItineraryProps
  coverPhoto?: string
  destinations: string[]
  endDate: Date
  id: number
  likes: number
  name: string
  profileId: number
  public: boolean
  startDate: Date
  tripDays: ITripDay
}

interface ITripDay {
  date: Date
  itineraryId: number
}

const itinerary = ({itin}: IItineraryProps) => {

  console.log('rendering tripdays')
  console.log('itin: ', itin);
  console.log('itin.tripDays: ', itin.tripDays);

  return (
    <div className='flex justify-center'>
      <div className='w-11/12'>
          <div className='bg-demoBG bg-cover bg-center p-3 rounded-lg drop-shadow-md'>
              <p className='text-2xl text-slate-50'>Paris Tip</p>
              <p>{format(new Date(itin.startDate), 'MMM d, yyyy')}</p>
              &nbsp;
              <p> - </p>
              &nbsp;
              <p>{format(new Date(itin.endDate), 'MMM d, yyyy')}</p>
              <p className='text-right mt-7'>Philip, Payam, and 3 others</p>
          </div>

          <div className='bg-blue-100 w-full mt-5 p-3 flex justify-center rounded-md drop-shadow-md'>
              <div className='grid grid-cols-1 divide-y divide-white text-black w-11/12'>
                {itin.tripDays.map((day: ITripDay, index: number) => {
                  return <TripDay key={index} date={new Date(day.date)}/>
                })}
              </div>
          </div>
      </div>
    </div>
  )
}

export default itinerary