import React, { useState } from 'react'
import TripDay from './tripDay'
import ActivityForm from './activityForm'


const itinerary = () => {



  return (
    <div className='flex justify-center'>
      <div className='w-11/12'>
          <div className='bg-demoBG bg-cover bg-center p-3 rounded-lg drop-shadow-md'>
              <p className='text-2xl text-slate-50'>Paris Tip</p>
              <p>6/20/23 - 7/02/23</p>
              <p className='text-right mt-7'>Philip, Payam, and 3 others</p>
          </div>

          <div className='bg-blue-100 w-full mt-5 p-3 flex justify-center rounded-md drop-shadow-md'>
              {/* Days */}
              <div className='grid grid-cols-1 divide-y divide-white text-black w-11/12'>
                < TripDay />
                < TripDay />
                < TripDay />
              </div>
          </div>
      </div>
    </div>
  )
}

export default itinerary