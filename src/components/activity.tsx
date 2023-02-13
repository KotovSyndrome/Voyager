import React, { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'
import { format } from 'date-fns'

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

    const updateActivity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivityState({...activityState, [e.target.name]: e.target.value})
    }

    const sendUpdateReq = async () => {
        await axios.put('/api/activities', {
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

    const handleBlur = async () => {
        setReadOnly(true)
        
        await sendUpdateReq()
    }


  return (

        <div onFocus={() => setReadOnly(false)} onBlur={handleBlur} >
            <div className='flex flex-col'>
                <input onChange={updateActivity} name='name' value={activityState.name} readOnly={readOnly} className='bg-white bg-opacity-40 rounded-md p-1 outline-none w-fit h-fit'/>

                <div className='bg-white bg-opacity-40 rounded-md p-2 mt-2'>
                    <textarea value={activityState.note} name='note' placeholder='Add notes, links, etc.' onChange={updateActivity} className='bg-transparent p-1 focus:ring-0 focus:ring-offset-0 border-0 resize-none mt-2 placeholder-slate-400 w-full' />
                    
                    <div className='flex justify-between'>
                        <div className='flex bg-sky-200 text-sky-600 rounded-full items-center p-1 w-fit text-xs cursor-pointer'>
                            <p>{format(activityState.startTime, 'p')}</p>

                            <p className='mx-1'>-</p>

                            <p>{format(activityState.endTime, 'p')}</p>
                        </div>

                        <BsTrashFill className='bg-red-400 p-1 cursor-pointer rounded-md text-white hover:bg-red-500' size={25} onClick={() => deleteActivity(id)}/>
                    </div>
                </div>
            </div>
        </div>


  )
}

export default activity
