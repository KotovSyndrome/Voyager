import React, { Dispatch, SetStateAction, useState, useId } from 'react'

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

interface IActivityFormProps {
    setActivitiesState: Dispatch<SetStateAction<IActivity[]>>,
    tripDayId: number
    itineraryData: IItineraryData
    setItineraryData: Dispatch<SetStateAction<IItineraryData | undefined>>
}

const guestActivityForm = ({setActivitiesState, tripDayId, itineraryData, setItineraryData}: IActivityFormProps) => {
    const [activityName, setActivityName] = useState('')
    const newActivityId = useId()

    const createAcitivity = () => {
        if (activityName.length === 0) return
    
        // update in sessionStorage

        const newActivity = {
          city: '',
          contactInfo: '',
          country: '',
          endTime: null,
          name: activityName,
          note: '',
          photo: null,
          postalCode: '',
          startTime: null,
          street: '',
          id: newActivityId,
          tripDayId: tripDayId
        }

        setActivityName('')

        setActivitiesState((prev) => [...prev, newActivity])

        const updatedItinerary = itineraryData

        updatedItinerary.tripDays.forEach(day => {
          if (day.id === tripDayId) day.activities.push(newActivity)
        })

        setItineraryData(prev => updatedItinerary)

        sessionStorage.setItem("guestItinerary", JSON.stringify(itineraryData))
    }


  return (
    <div className='text-black mt-3'>
        <div className='flex justify-between'>
            <input type={'text'} value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder='Ex. Eiffel Tower' className='rounded-md p-1 w-1/2 focus:ring-0 focus:ring-offset-0 text-black border-0'/>
            <button onClick={createAcitivity} className='bg-teal-300 py-1 px-2 rounded-lg text-black hover:bg-teal-500'>Add activity</button>
        </div>
    </div>
  )
}

export default guestActivityForm