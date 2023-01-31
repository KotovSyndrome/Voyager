import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import ProfilePlaceholder from '../assets/profile-placeholder.png'

interface ITripCard {
    title: String,
    startDate: Date,
    endDate: Date,
    collaborators: String[] | [],
    id: Number
    bgImage: string
}

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

const tripCard = ({ title, startDate, endDate, collaborators, id}: ITripCard) => {

  return (
    <div className='mt-8'>
        {/* @ts-ignore */}
        <p className='text-2xl font-semibold'>{months[`${startDate.getMonth()}`]}</p>

        <div  className='bg-gray-300 mt-2 lg:w-3/12 p-3 rounded-lg cursor-pointer sm:w-5/12'>
            <Link href={{pathname:'/trips/[id]', query: { id: id.toString() }}}>
                <div className='flex justify-between'>
                    <p className='text-xl'>{title} </p>
                    <div>
                        <BsThreeDotsVertical size={20} className='mt-1 cursor-pointer'/>
                    </div>
                </div>
                
                <p>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
                
                {/* Profile images of collaborators */}
                <div className='flex mt-8'>
                    <Image src={ProfilePlaceholder} alt='collaborator' height={30} width={30} className='rounded-full'/>
                    <FaUserCircle size={30}/>
                    <FaUserCircle size={30}/>
                    <FaUserCircle size={30}/>
                    <FaUserCircle size={30}/>
                    <FaUserCircle size={30}/>
                </div>
            </Link>

        </div>
    </div>
  )
}

export default tripCard