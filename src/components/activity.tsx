import React, { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'

interface IActivityProps {
    setReadOnly: Dispatch<SetStateAction<boolean>>
    deleteActivity: (activityId: number) => Promise<void>
    readOnly: boolean
    city: string
    contactInfo: string
    country: string
    endTime: Date
    id: number
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: Date
    street: string
    tripDayId: number
}


const activity = ({readOnly, setReadOnly, deleteActivity, city, contactInfo, country, endTime, id, name, note, photo, postalCode, startTime, street, tripDayId}: IActivityProps) => {
    const [activityState, setActivityState] = useState({
        city: city,
        contactInfo: contactInfo,
        country: country,
        endTime: endTime,
        name: name,
        note: note,
        photo: photo,
        postcalCode: postalCode,
        startTime: startTime,
        street: street
    })

    const updateActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActivityState({...activityState, [e.target.name]: e.target.value})
    }

    const sendUpdateReq = async () => {
        const req = await axios.put('/api/activities', {
            activityName: activityState.name,
            activityStartTime: activityState.startTime,
            activityEndTime: activityState.endTime,
            activityContactInfo: activityState.contactInfo,
            activityNote: activityState.note,
            activityStreet: activityState.street,
            activityPostalCode: activityState.postcalCode,
            activityCity: activityState.city,
            activityCountry: activityState.country,
            activityId: id
        })
    }


  return (
    <div className='flex justify-between space-x-5'>
        <div onFocus={() => setReadOnly(false)} onBlur={() => setReadOnly(true)} className='flex space-x-2'>
            <input onChange={updateActivity} className='bg-white bg-opacity-40 rounded-md p-1 outline-none' name='name' value={activityState.name} readOnly={readOnly}/>
            <input value={activityState.startTime.getTime()}  className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none' readOnly={readOnly}/>
            <p>to</p>
            <input value={activityState.endTime.getTime()} className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none' readOnly={readOnly}/>
            <button className='bg-indigo-300 p-1 rounded-md hover:bg-indigo-500'><TbNotes size={20}/></button>
        </div>

        <div className='space-x-1'>
            <button onClick={sendUpdateReq} className='bg-orange-300 p-1 rounded-md hover:bg-orange-500'><AiFillEdit size={20}/></button>
            <button onClick={() => deleteActivity(id)} className='bg-red-300 p-1 rounded-md hover:bg-red-500'><BsTrashFill size={20}/></button>
        </div>
    </div>
  )
}

export default activity