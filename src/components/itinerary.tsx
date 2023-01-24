import React, { useState } from 'react'
import TripDay from './tripDay'
import ActivityForm from './activityForm'
import format from 'date-fns/format';


// interface IItineraryData {
//   name: string
//   startDate: Date
//   endDate: Date
//   destinations: string
//   likes: number
//   tripDay: ITripDay
//   public: boolean
//   profile: IProfile
// }

interface ITripDay {
  date: Date
  itineraryId: number
  // activities:  IActivity[]
}

// interface IProfile {
//   bio                            String
//   username                       String
//   timeFormat                     TimeFormat
//   comments                       Comment[]
//   itineraries                    Itinerary[]
//   user                           User?
// }

// interface IActivity {

// }

const itinerary = (itin) => {

  console.log('rendering tripdays')
  console.log('itin.itin.tripDays', itin.itin.tripDays);

  return (
    <div className='flex justify-center'>
      <div className='w-11/12'>
          <div className='bg-demoBG bg-cover bg-center p-3 rounded-lg drop-shadow-md'>
              <p className='text-2xl text-slate-50'>Paris Tip</p>
              <p>{format(new Date(itin.itin.startDate), 'MMM d, yyyy')}</p>
              &nbsp;
              <p> - </p>
              &nbsp;
              <p>{format(new Date(itin.itin.endDate), 'MMM d, yyyy')}</p>
              <p className='text-right mt-7'>Philip, Payam, and 3 others</p>
          </div>

          <div className='bg-blue-100 w-full mt-5 p-3 flex justify-center rounded-md drop-shadow-md'>
              {/* Days */}
              <div className='grid grid-cols-1 divide-y divide-white text-black w-11/12'>
                {/* <TripDay date={new Date}/> */}
                {itin.itin.tripDays.map((day: ITripDay, index: number) => {
                  // console.log('day', day);
                  return <TripDay key={index} date={new Date(day.date)}/>
                })}
              </div>
          </div>
      </div>
    </div>
  )
}

export default itinerary