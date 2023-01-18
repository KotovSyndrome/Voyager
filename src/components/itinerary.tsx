import React, { useState } from 'react'
import TripDay from './tripDay'
import ActivityForm from './activityForm'


const itinerary = () => {

  return (
    <div className='w-full h-full border-r-black border-r-2 flex justify-center'>
        <div className='w-11/12 mt-8'>
            <div className='bg-gray-300 w-full p-3 rounded-lg drop-shadow-md'>
                <p className='text-2xl text-slate-50'>Paris Tip</p>
                <p>6/20/23 - 7/02/23</p>
                <p className='text-right mt-7'>Philip, Payam, and 3 others</p>
            </div>

            <div className='bg-gray-300 w-full mt-5 p-3 flex flex-col items-center rounded-md drop-shadow-md'>
                {/* Days */}
                < TripDay />
                < TripDay />
                < TripDay />
                < ActivityForm />
            </div>
        </div>
    </div>
  )
}

export default itinerary