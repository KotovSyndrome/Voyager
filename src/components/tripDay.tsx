import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import ActivityForm from './activityForm';
import format from 'date-fns/format';
import Activity from './activity'

interface IActivity {
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
interface ITripDayProps {
    date: Date
    activities: IActivity[] | [],
    tripDayId: number
}

const tripDay = ({date, activities, tripDayId}: ITripDayProps) => {
    const [ readOnly, setReadOnly ] = useState(true);
    const [activitiesState, setActivitiesState] = useState(activities) 

    const deleteActivity = async (activityId: number) => {
        const call = await axios.delete('/api/activities', { 
           data: { activityId: activityId } 
        })

        setActivitiesState((prev) => prev.filter(act => act.id !== activityId))
    }

    console.log('startTime type: ', typeof activities[0]?.startTime)


  return (
    <div className='w-full p-3 text-black'>
        <div className='flex justify-between'>
            <p className='mb-3 text-xl font-semibold'>{format(date, 'MMM do')}</p>
        </div>

        <div className='space-y-3'>
        {activitiesState.length > 0 && (
            activitiesState.map(act => {
                return <Activity
                            key={act.id} 
                            readOnly={readOnly} 
                            setReadOnly={setReadOnly} 
                            deleteActivity={deleteActivity}
                            city={act.city}
                            contactInfo={act.contactInfo}
                            country={act.country}
                            endTime={new Date(act.endTime)}
                            id={act.id}
                            name={act.name}
                            note={act.note}
                            photo={act.photo}
                            postalCode={act.postalCode}
                            startTime={new Date(act.startTime)}
                            street={act.street}
                            tripDayId={act.tripDayId}
                        />
            })
        )}
        </div>
    
        <ActivityForm  setActivitiesState={setActivitiesState} tripDayId={tripDayId}/>
    </div>
  )
}

export default tripDay
