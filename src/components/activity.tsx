import React, { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'
import { format, parse } from 'date-fns'

interface IActivityProps {
    setReadOnly: Dispatch<SetStateAction<boolean>>
    deleteActivity: (activityId: number) => Promise<void>
    readOnly: boolean
    city: string
    contactInfo: string
    country: string
    endTime: string
    id: number
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: string
    street: string
    tripDayId: number
}


const activity = ({readOnly, setReadOnly, deleteActivity, city, contactInfo, country, endTime, id, name, note, photo, postalCode, startTime, street, tripDayId}: IActivityProps) => {
    const [activityState, setActivityState] = useState({
        city: city,
        contactInfo: contactInfo,
        country: country,
        endTime: `${endTime ? format(new Date(endTime), 'HH') : '--:-- --'}:${endTime ? format(new Date(endTime), 'mm') : '--:-- --'}`,
        name: name,
        note: note,
        photo: photo,
        postcalCode: postalCode,
        startTime: `${startTime ? format(new Date(startTime), 'HH'): '--:-- --'}:${startTime ? format(new Date(startTime), 'mm') : '--:-- --'}`,
        street: street
    })
    const [timeDropDown, setTimeDropDown] = useState(false)


    const updateActivity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivityState({...activityState, [e.target.name]: e.target.value})
        
    }

    const sendUpdateReq = async () => {
        let tempStartDate

        if (activityState.startTime.includes('-')) {
            tempStartDate = null
        } else {
            tempStartDate = new Date()
            tempStartDate.setHours(Number(activityState.startTime.substring(0,2)))
            tempStartDate.setMinutes(Number(activityState.startTime.substring(3,5)))
        }

        let tempEndDate

        if (activityState.startTime.includes('-')) {
            tempStartDate = null
        } else {
            tempEndDate = new Date()
            tempEndDate.setHours(Number(activityState.endTime.substring(0,2)))
            tempEndDate.setMinutes(Number(activityState.endTime.substring(3,5)))
        }


        console.log('startTime API Call :', tempStartDate)
        console.log('endTime API Call :', tempEndDate)

        await axios.put('/api/activities', {
            activityName: activityState.name,
            activityStartTime: tempStartDate,
            activityEndTime: tempEndDate,
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



    const getActualTime = (timeState: string) => {
        if (timeState.includes('-')) {
            return null
        }

        const hours = Number(timeState.substring(0,2))
        let time = timeState

        console.log('timeState:', timeState)

        if (hours >= 13) {
            time = `${Math.abs(hours - 12)}:${timeState.substring(3,5)} PM`
        } else if (hours === 12) {
            time = `12:${timeState.substring(3,5)} PM`
        } else if (hours === 0) {
            time = `12:${timeState.substring(3,5)} AM`
        } else {
            time = time + ' AM'
        }

        return time
    }

    const clearTime = () => {
        setActivityState({...activityState, 'startTime': '--:-- --', 'endTime': '--:-- --'})
        setTimeDropDown(prev => !prev)
    }

    console.log('endTime: ', activityState.endTime)

  return (

        <div onFocus={() => setReadOnly(false)} onBlur={handleBlur} >
            <div className='flex flex-col'>
                <input onChange={updateActivity} name='name' value={activityState.name} readOnly={readOnly} className='bg-white bg-opacity-40 rounded-md p-1 outline-none w-fit h-fit'/>

                <div className='bg-white bg-opacity-40 rounded-md p-2 mt-2'>
                    <textarea value={activityState.note} name='note' placeholder='Add notes, links, etc.' onChange={updateActivity} className='bg-transparent p-1 focus:ring-0 focus:ring-offset-0 border-0 resize-none mt-2 placeholder-slate-400 w-full' />
                    
                    <div className='flex justify-between'>
                        <div  className=' bg-sky-200 text-sky-600 rounded-full p-1 w-fit text-xs cursor-pointer relative'>
                            {activityState.startTime.includes('-') ? (
                                <div onClick={() => setTimeDropDown(prev => !prev)}>
                                    <p className='px-2'>Add time</p>
                                </div>
                            ) : (
                                <div onClick={() => setTimeDropDown(prev => !prev)} className='flex items-center'>
                                    <p>{getActualTime(activityState.startTime)}</p>

                                    {activityState.endTime.includes('-') ? null : <p className='mx-1'>-</p>}

                                    <p>{getActualTime(activityState.endTime)}</p>
                                </div>
                            )}



                            {timeDropDown && (
                                <div onBlur={() => setTimeDropDown(prev => !prev)} className='absolute top-10 bg-slate-400 p-3 rounded-lg'>
                                    <div className='flex'>
                                        <input value={activityState.startTime} onChange={updateActivity} type='time' name='startTime' className='rounded-md border-0'/>
                                        <p>-</p>
                                        <input value={activityState.endTime} onChange={updateActivity} type='time' name='endTime' className='rounded-md border-0'/>
                                    </div>

                                    <div className='flex justify-around mt-4 text-lg'>
                                        <button onClick={clearTime} className='rounded-lg px-6 py-1 bg-orange-300 text-white'>Clear</button>
                                        <button onClick={() => setTimeDropDown(prev => !prev)} className='rounded-lg px-6 py-1 bg-green-300 text-white'>Save</button>
                                    </div>
                                </div>
                            )}
                            
                        </div>

                        <BsTrashFill className='bg-red-400 p-1 cursor-pointer rounded-md text-white hover:bg-red-500' size={25} onClick={() => deleteActivity(id)}/>
                    </div>
                </div>
            </div>
        </div>


  )
}

export default activity
