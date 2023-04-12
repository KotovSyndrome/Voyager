import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import { useUser } from "@clerk/nextjs";

interface ITripCard {
    title: String,
    destinations: String
    startDate: Date,
    endDate: Date,
    collaborators: String[] | [],
    id: Number
    bgImage: string
}

const TripCard = ({ title, startDate, endDate, collaborators, id, destinations}: ITripCard) => {
    const { user } = useUser();

  return (

    <div  className='bg-white bg-opacity-80 text-black mt-2 p-3 rounded-lg drop-shadow-lg cursor-pointer max-w-m md:max-w-sm trip-card'>
        <Link href={{pathname:'/trips/[id]', query: { id: id.toString() }}} as={`/trips/${id.toString()}`}>
            <div className='flex justify-between'>
                <h3 className='text-xl'>{title} </h3>
                {/* <div>
                    <BsThreeDotsVertical size={20} className='mt-1 cursor-pointer'/>
                </div> */}
            </div>
            
            <p className='italic text-slate-500'>{destinations}</p>
            <p className='text-sm' title='itinerary-date'>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
            
            {/* Profile images of collaborators */}
            <div className='flex mt-8'>
                <Image src={user?.profileImageUrl || ProfilePlaceholder} alt='collaborator' height={30} width={30} className='rounded-full'/>
                {/* <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/>
                <FaUserCircle size={30}/> */}
            </div>
        </Link>
    </div>
  )
}

export default TripCard
