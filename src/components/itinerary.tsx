import React from 'react'

const itinerary = () => {
  return (
    <div className='w-full h-full border-r-black border-r-2 flex justify-center'>
        <div className='w-11/12 mt-8'>
            <div className='bg-gray-300 w-full p-3 rounded-lg'>
                <p className='text-2xl text-slate-50'>Paris Tip</p>
                <p>6/20/23 - 7/02/23</p>
                <p className='text-right mt-7'>Philip, Payam, and 3 others</p>
            </div>

            <div className='bg-gray-300 w-full mt-5 p-3 flex flex-col items-center rounded-md'>
                {/* Days */}
                <div className='bg-gray-400 w-11/12 rounded-md p-2 text-slate-50'>
                    <p>Day 1</p>
                    <p className='mb-3'>6/20</p>
                    <p>Activity</p>
                    <label>Add activity: </label>
                    <input type={'text'} placeholder='Ex. The Louvre' className='rounded-md p-1'/>
                </div>
                <div className='bg-gray-400 w-11/12 rounded-md p-2 text-slate-50 mt-5'>
                    <p>Day 1</p>
                    <p className='mb-3'>6/20</p>
                    <p>Activity</p>
                    <label>Add activity: </label>
                    <input type={'text'} placeholder='Ex. The Louvre' className='rounded-md p-1'/>
                </div>
                <div className='bg-gray-400 w-11/12 rounded-md p-2 text-slate-50 mt-5'>
                    <p>Day 1</p>
                    <p className='mb-3'>6/20</p>
                    <p>Activity</p>
                    <label>Add activity: </label>
                    <input type={'text'} placeholder='Ex. The Louvre' className='rounded-md p-1'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default itinerary