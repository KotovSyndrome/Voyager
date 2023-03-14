import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { format } from 'date-fns'


interface IActivity {
    city: string
    contactInfo: string
    country: string
    endTime: string | null
    id: string
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: string | null
    street: string
    tripDayId: number
  }
  interface IGuestTripDay {
    date: string
    activities: IActivity[]
    id: number
  }

  interface IItineraryData {
    coverPhoto: string
    destinations: string
    endDate: string
    likes: number
    name: string
    public: boolean
    startDate: string
    tripDays: IGuestTripDay[]
  }

interface IActivityProps {
    setReadOnly: Dispatch<SetStateAction<boolean>>
    setItineraryData: Dispatch<SetStateAction<IItineraryData | undefined>>
    deleteActivity: (activityId: string) => Promise<void>
    itineraryData: IItineraryData
    readOnly: boolean
    city: string
    contactInfo: string
    country: string
    endTime: string | null
    id: string
    name: string
    note: string
    photo: string | null
    postalCode: string
    startTime: string | null
    street: string
    tripDayId: number
}

const guestActivity = ({
    setReadOnly, 
    deleteActivity, 
    readOnly, 
    city, 
    contactInfo, 
    country, 
    endTime, 
    id, 
    name, 
    note, 
    photo,
    postalCode,
    startTime,
    street,
    tripDayId,
    itineraryData,
    setItineraryData
}: IActivityProps) => {
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
    const [displayStartTime, setDisplayStartTime] = useState(activityState.startTime)
    const [displayEndTime, setDisplayEndTime] = useState(activityState.endTime)
    const clearedTimeRef = useRef(false)

    useEffect(() => {
        if (clearedTimeRef.current) {
            setDisplayStartTime(`${activityState.startTime}`)
            setDisplayEndTime(`${activityState.endTime}`)
            updateStorage()
            clearedTimeRef.current = false
        }
    }, [activityState])


    const updateActivity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivityState({...activityState, [e.target.name]: e.target.value})
        
    }

    const updateStorage = async () => {
        let tempStartDate: Date | null

        if (activityState.startTime.includes('-')) {
            tempStartDate = null
        } else {
            tempStartDate = new Date()
            tempStartDate.setHours(Number(activityState.startTime.substring(0,2)))
            tempStartDate.setMinutes(Number(activityState.startTime.substring(3,5)))
        }

        let tempEndDate: Date | null

        if (activityState.startTime.includes('-')) {
            tempEndDate = null
        } else {
            tempEndDate = new Date()
            tempEndDate.setHours(Number(activityState.endTime.substring(0,2)))
            tempEndDate.setMinutes(Number(activityState.endTime.substring(3,5)))
        }
        
        // update activity in sessionStorage
        const updatedItinerary = itineraryData

        //Loop over and replace activity with updated one
        updatedItinerary.tripDays.forEach(day => {
            if (day.id === tripDayId) {
                day.activities.forEach(act => {
                    if (id === act.id) {
                        act.name = activityState.name,
                        //@ts-ignore
                        act.startTime = tempStartDate,
                        //@ts-ignore
                        act.endTime = tempEndDate,
                        act.contactInfo = activityState.contactInfo,
                        act.note = activityState.note,
                        act.street = activityState.street,
                        act.postalCode = activityState.postcalCode,
                        act.city = activityState.city,
                        act.country = activityState.country
                    }
                })
            }
          })
        
        
        setItineraryData(prev => updatedItinerary)
        
        sessionStorage.setItem("guestItinerary", JSON.stringify(itineraryData))
    }

    const handleBlur = async () => {
        setReadOnly(true)
        
        await updateStorage()
    }



    const getActualTime = (timeState: string) => {
        if (timeState.includes('-')) {
            return null
        }

        const hours = Number(timeState.substring(0,2))
        let time = timeState


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
        setTimeDropDown(prev => !prev)
        setActivityState({...activityState, 'startTime': '--:-- --', 'endTime': '--:-- --'})
        clearedTimeRef.current = true
    }

    const saveTime = async () => {
        setTimeDropDown(prev => !prev)
        setDisplayStartTime(activityState.startTime)
        setDisplayEndTime(activityState.endTime)
        await updateStorage()
    }

  return (
    <div>
        <div className='flex flex-col'>
            <input onChange={updateActivity} name='name' value={activityState.name} readOnly={readOnly} onFocus={() => setReadOnly(false)} onBlur={handleBlur} className='bg-white bg-opacity-40 rounded-md p-1 outline-none w-fit h-fit'/>

            <div className='bg-white bg-opacity-40 rounded-md p-2 mt-2'>
                <textarea value={activityState.note} name='note' onFocus={() => setReadOnly(false)} onBlur={handleBlur} placeholder='Add notes, links, etc.' onChange={updateActivity} className='bg-transparent p-1 focus:ring-0 focus:ring-offset-0 border-0 resize-none mt-2 placeholder-slate-400 w-full' />
                
                <div className='flex justify-between'>
                    <div  className=' bg-sky-200 text-sky-600 rounded-full p-1 w-fit text-xs cursor-pointer relative'>
                        {displayStartTime.includes('-') ? (
                            <div onClick={() => setTimeDropDown(prev => !prev)}>
                                <p className='px-2'>Add time</p>
                            </div>
                        ) : (
                            <div onClick={() => setTimeDropDown(prev => !prev)} className='flex items-center'>
                                <p>{getActualTime(displayStartTime)}</p>

                                {activityState.endTime.includes('-') ? null : <p className='mx-1'>-</p>}

                                <p>{getActualTime(displayEndTime)}</p>
                            </div>
                        )}



                        {timeDropDown && (
                            <div className='absolute top-10 bg-slate-400 p-3 rounded-lg z-10'>
                                <div className='flex'>
                                    <input value={activityState.startTime} onChange={updateActivity} type='time' name='startTime' className='rounded-md border-0'/>
                                    <p>-</p>
                                    <input value={activityState.endTime} onChange={updateActivity} type='time' name='endTime' className='rounded-md border-0'/>
                                </div>

                                <div className='flex justify-around mt-4 text-lg'>
                                    <button onClick={clearTime} className='rounded-lg px-6 py-1 bg-orange-300 text-white hover:bg-orange-500'>Clear</button>
                                    <button onClick={saveTime} className='rounded-lg px-6 py-1 bg-green-300 text-white hover:bg-green-500'>Save</button>
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

export default guestActivity