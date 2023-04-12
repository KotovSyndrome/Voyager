import React from 'react'
import format from 'date-fns/format';
import ViewActivity from './ViewActivity';

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

const ViewTripDay = ({date, activities, tripDayId}: ITripDayProps) => {

  return (
    <div className='w-full p-3 text-black'>
        <div className='flex justify-between'>
            <p className='mb-3 text-xl font-semibold'>{format(date, 'MMM do')}</p>
        </div>

        <div className='space-y-8'>
            {activities.map(act => {
                return <ViewActivity
                            key={act.id} 
                            city={act.city}
                            contactInfo={act.contactInfo}
                            country={act.country}
                            endTime={act.endTime}
                            id={act.id}
                            name={act.name}
                            photo={act.photo}
                            postalCode={act.postalCode}
                            startTime={act.startTime}
                            street={act.street}
                            tripDayId={act.tripDayId}
                        />
                    }
                )
            }
        </div>
    </div>
  )
}

export default ViewTripDay
