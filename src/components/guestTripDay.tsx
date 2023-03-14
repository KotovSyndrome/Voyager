import React, { useState, Dispatch, SetStateAction } from 'react'
import format from 'date-fns/format';
import GuestActivity from './guestActivity';
import GuestActivityForm from './guestActivityForm';

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

interface ITripDayProps {
    date: Date
    activities: IActivity[] | [],
    tripDayId: number,
    itineraryData: IItineraryData
    setItineraryData: Dispatch<SetStateAction<IItineraryData | undefined>>
}

const guestTripDay = ({ date, activities, tripDayId, itineraryData, setItineraryData}: ITripDayProps) => {
    const [ readOnly, setReadOnly ] = useState(true);
    const [activitiesState, setActivitiesState] = useState(activities) 

    const deleteActivity = async (activityId: string) => {
      setActivitiesState((prev) => prev.filter(act => act.id !== activityId))
      
      const updatedItinerary = itineraryData

      updatedItinerary.tripDays.forEach(day => {
        if (day.id === tripDayId) {
          const filteredActivities = day.activities.filter(act => activityId !== act.id)

          day.activities = filteredActivities
        }
      })
    
      setItineraryData(prev => updatedItinerary)
    
      sessionStorage.setItem("guestItinerary", JSON.stringify(itineraryData))
    }


  return (
<div className='w-full p-3 text-black'>
        <div className='flex justify-between'>
            <p className='mb-3 text-xl font-semibold'>{format(date, 'MMM do')}</p>
        </div>

        <div className='space-y-3'>
        {activitiesState.length > 0 && (
            activitiesState.map(act => {
                return <GuestActivity
                            key={act.id} 
                            readOnly={readOnly} 
                            setReadOnly={setReadOnly} 
                            deleteActivity={deleteActivity}
                            city={act.city}
                            contactInfo={act.contactInfo}
                            country={act.country}
                            endTime={act.endTime}
                            id={act.id}
                            name={act.name}
                            note={act.note}
                            photo={act.photo}
                            postalCode={act.postalCode}
                            startTime={act.startTime}
                            street={act.street}
                            tripDayId={act.tripDayId}
                            itineraryData={itineraryData}
                            setItineraryData={setItineraryData}
                        />
            })
        )}
        </div>
    
        <GuestActivityForm  setActivitiesState={setActivitiesState} tripDayId={tripDayId} itineraryData={itineraryData} setItineraryData={setItineraryData}/>
    </div>
  )
}

export default guestTripDay