import React from 'react'
import { format, parse } from 'date-fns'
import activity from './myActivity'

interface IActivityProps {
    city: string
    contactInfo: string
    country: string
    endTime: string
    id: number
    name: string
    photo: string | null
    postalCode: string
    startTime: string
    street: string
    tripDayId: number
}

const ViewActivity = ({city, contactInfo, country, endTime, id, name, photo, postalCode, startTime, street, tripDayId}: IActivityProps) => {
    const formattedStartTime = `${startTime ? format(new Date(startTime), 'HH'): '--:-- --'}:${startTime ? format(new Date(startTime), 'mm') : '--:-- --'}`
    const formattedEndTime = `${endTime ? format(new Date(endTime), 'HH') : '--:-- --'}:${endTime ? format(new Date(endTime), 'mm') : '--:-- --'}`

    console.log('startTime: ', startTime)
    console.log('formatted startTime: ', formattedStartTime)

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


  return (
        <div>
            <div className='flex flex-col bg-blue-200 rounded-lg p-3'>
                <p className='bg-white bg-opacity-80 rounded-md p-1 outline-none w-fit h-fit'>{name}</p>

                <div  className=' bg-sky-200 text-sky-600 rounded-full p-1 w-fit text-xs mt-2'>
                    {!formattedStartTime.includes('-') && (
                        <div className='flex items-center'>
                            <p>{getActualTime(formattedStartTime)}</p>

                            {formattedEndTime.includes('-') ? null : <p className='mx-1'>-</p>}

                            <p>{getActualTime(formattedEndTime)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
  )
}

export default ViewActivity