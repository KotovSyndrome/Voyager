import React from 'react'
import Image from 'next/image'
import Island from '../assets/island_placeholder.jpeg'
import { AiFillHeart } from 'react-icons/ai'

interface IItineraryCard {
  title: string,
  location: string,
  creator: string,
  likes: number
}

interface IItineraryCardProps {
  coverPhoto: string
  destinations: string
  endDate: string
  id: number
  likes: number
  name: string
  profileName: string
  startDate: string
}

const itineraryCard = ({coverPhoto, destinations, endDate, id, likes, name, profileName, startDate}: IItineraryCardProps ) => {


  return (
    <div className='bg-white p-4 bg-opacity-80 rounded-lg drop-shadow-lg cursor-pointer text-black'>
        <Image src={coverPhoto} alt='Itinerary cover' width={300} height={300} className='rounded-md'/>

        <div className='flex justify-between'>
            <p className='text-lg'>{name}</p>
            {/* <div><AiFillHeart size={22} color={'red'} className='inline-block'/>{`${likes}`}</div> */}
        </div>


        <p className='text-slate-500'>{destinations}</p>


        <p className='mt-5'>By: {profileName}</p>
    </div>
  )
}

export default itineraryCard