import React from 'react'
import Image from 'next/image'
import Island from '../assets/island_placeholder.jpeg'
import { AiFillHeart } from 'react-icons/ai'

interface IItineraryCard {
  title: String,
  location: String,
  creator: String,
  likes: Number
}

const itineraryCard = ({title, location, creator, likes}: IItineraryCard ) => {
  return (
    <div className='bg-white p-4 bg-opacity-70 rounded-lg drop-shadow-lg cursor-pointer'>
        <Image src={Island} alt='destination name' width={300} height={300} className='rounded-md'/>

        <div className='flex justify-between'>
            <p className='text-lg'>{title}</p>
            <div><AiFillHeart size={22} color={'red'} className='inline-block'/>{`${likes}`}</div>
        </div>

        <p className='text-slate-500'>{location}</p>

        <p className='mt-5'>By: {creator}</p>
    </div>
  )
}

export default itineraryCard