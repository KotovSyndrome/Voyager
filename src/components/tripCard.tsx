import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ITripCard } from '../types/trips/tripCard'
import { FaUserCircle } from 'react-icons/fa'

const tripCard = ({ title, startDate, endDate, collaborators}: ITripCard) => {


  return (
    <div className='mt-8'>
        <p className='text-2xl font-semibold'>{startDate.toLocaleDateString()}</p>

        <div className='bg-gray-300 mt-2 lg:w-3/12 p-3 rounded-lg sm:w-5/12'>
            <div className='flex justify-between'>
                <p className='text-xl'>{title} </p>
                <div>
                    <BsThreeDotsVertical size={20} className='mt-1 cursor-pointer'/>
                </div>
            </div>
            
            <p>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
            
            {/* Profile images of collaborators */}
            <div className='flex mt-8'>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
            </div>

        </div>
    </div>
  )
}

export default tripCard