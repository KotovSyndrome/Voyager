import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'

const tripDay = () => {
    const [activityName, setActivityName] = useState('')

    const createAcitivity = async () => {
        if (activityName.length === 0) return

        const call = await axios.post('/api/activities/create', {
            activityName: activityName,
            activityStartTime: new Date(),
            activityEndTime: new Date(),
            activityContactInfo: '',
            activityNote: '',
            activityStreet: '',
            activityPostalCode: '',
            activityCity: '',
            activityCountry: '',
            tripDayId: 1
        })

        console.log(call)

        setActivityName('')
    }

    const deleteActivity = async () => {
        const req = await axios.delete('/api/activities/delete', { 
           data: { activityId: 29 } 
        })

        console.log(req)
    }

    const updateActivity = async () => {
        const req = await axios.patch('/api/activities/update', {
            activityName: 'This is a mothafuckin test activity',
            activityStartTime: new Date(),
            activityEndTime: new Date(),
            activityContactInfo: '',
            activityNote: '',
            activityStreet: '',
            activityPostalCode: '',
            activityCity: '',
            activityCountry: '',
            activityId: 1
        })
    }

  return (
    <div className='bg-gray-400 w-11/12 rounded-md p-3 text-slate-50 mt-3'>
        <p className='mb-3 text-xl'>Saturday, 6/20</p>
        <p>Activity</p>
        <button onClick={deleteActivity} className='bg-red-400 p-1 rounded-md'><BsTrashFill size={20}/></button>
        <button onClick={updateActivity} className='bg-indigo-300 py-1 px-2 rounded-lg hover:bg-indigo-500'>Update</button>

        <div className='flex justify-between'>
            <input type={'text'} value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder='Ex. The Louvre' className='rounded-md p-2 w-1/2 outline-none text-black'/>
            <button onClick={createAcitivity} className='bg-teal-300 py-1 px-2 rounded-lg text-black hover:bg-teal-500'>Add activity</button>
        </div>
    </div>
  )
}

export default tripDay