import React from 'react'

const demoItinerary = () => {
  return (
    <div className='w-full flex justify-center mt-20 '>      
      <div className='rounded-lg bg-sky-200 w-3/5 pb-10'>
        <h3 className='text-2xl text-center mt-6'>Spain Trip</h3>

        {/* <DayLayout/> */}
        <div className='bg-gray-200 rounded-lg w-4/5 m-auto p-2 h-32 mt-5'>
          <p>Day 1</p>
        </div>
        <div className='bg-gray-200 rounded-lg w-4/5 m-auto p-2 h-32 mt-5'>
          <p>Day 2</p>
        </div>
        <div className='bg-gray-200 rounded-lg w-4/5 m-auto p-2 h-32 mt-5'>
          <p>Day 3</p>
        </div>
      </div>
    </div>
  )
}

export default demoItinerary