import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'
import ActivityForm from './activityForm';
import format from 'date-fns/format';

interface ITripDayProps {
    date: Date
}

const tripDay = ({date}: ITripDayProps) => {

    const [ readOnly, setReadOnly ] = useState(true);

    const deleteActivity = async () => {
        const call = await axios.delete('/api/activities', { 
           data: { activityId: 30 } 
        })

    }

    const updateActivity = async () => {
        const req = await axios.put('/api/activities', {
            activityName: 'Activity name update',
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
    <div className='w-full p-3 text-black'>
        <div className='flex justify-between'>
            <p className='mb-3 text-xl font-semibold'>{format(date, 'MMM do')}</p>
        </div>

        <div className='flex justify-between space-x-5'>
            <div onFocus={(e) => setReadOnly(false)} onBlur={(e) => setReadOnly(true)} className='flex space-x-2'>
                <input className='bg-white bg-opacity-40 rounded-md p-1 outline-none' value={'The Louvre Museum'} readOnly={readOnly}/>
                <input value={'10:00 AM'}  className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none' readOnly={readOnly}/>
                <p>to</p>
                <input value={'02:00 PM'} className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none' readOnly={readOnly}/>
                <button className='bg-indigo-300 p-1 rounded-md hover:bg-indigo-500'><TbNotes size={20}/></button>
            </div>

            <div className='space-x-1'>
                <button onClick={updateActivity} className='bg-orange-300 p-1 rounded-md hover:bg-orange-500'><AiFillEdit size={20}/></button>
                <button onClick={deleteActivity} className='bg-red-300 p-1 rounded-md hover:bg-red-500'><BsTrashFill size={20}/></button>
            </div>
        </div>

        <ActivityForm />
    </div>
  )
}

export default tripDay