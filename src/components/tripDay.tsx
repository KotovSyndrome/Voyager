import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'

const tripDay = () => {


    const deleteActivity = async () => {
        const call = await axios.delete('/api/activities', { 
           data: { activityId: 30 } 
        })

        console.log(call)
    }

    const updateActivity = async () => {
        const req = await axios.put('/api/activities', {
            activityName: 'This is a mothafuckin update bitch',
            activityStartTime: new Date(),
            activityEndTime: new Date(),
            activityContactInfo: '',
            activityNote: '',
            activityStreet: '',
            activityPostalCode: '',
            activityCity: '',
            activityCountry: '',
            activityId: 31
        })
    }

  return (
    <div className='bg-gray-400 w-11/12 rounded-md p-3 text-slate-50 mt-3'>
        <div className='flex justify-between'>
            <p className='mb-3 text-xl font-semibold'>Saturday, 6/20</p>
            <div className='space-x-3'>
               
                
            </div>
        </div>

        <div className='flex justify-between'>
            <div className='flex space-x-3'>
                <input className='bg-white bg-opacity-20 rounded-md p-1 outline-none' value={'The Louvre Museum'} readOnly/>
                <input value={'10:00 AM'} readOnly className='bg-white bg-opacity-20 rounded-md p-1 w-20 outline-none'/>
                <p>to</p>
                <input value={'02:00 PM'} readOnly className='bg-white bg-opacity-20 rounded-md p-1 w-20 outline-none'/>
                <button className='bg-indigo-300 p-1 rounded-md hover:bg-indigo-500'><TbNotes size={20}/></button>
            </div>

            <div className='space-x-2'>
                <button onClick={updateActivity} className='bg-orange-300 p-1 rounded-md hover:bg-orange-500'><AiFillEdit size={20}/></button>
                <button onClick={deleteActivity} className='bg-red-300 p-1 rounded-md hover:bg-red-500'><BsTrashFill size={20}/></button>
            </div>
        </div>

    </div>
  )
}

export default tripDay