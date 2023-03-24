import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import axios from 'axios';
import useDebounce from '../hooks/useDebounce'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import type {RawResult} from 'leaflet-geosearch/dist/providers/openStreetMapProvider'

interface IActivityFormProps {
    setActivitiesState: Dispatch<SetStateAction<IActivity[]>>,
    tripDayId: number,
    mapResults: SearchResult<RawResult>[],
    setMapResults: Dispatch<SetStateAction<SearchResult<RawResult>[]>>
}

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

  const provider = new OpenStreetMapProvider();

const activityForm = ({setActivitiesState, tripDayId, mapResults, setMapResults}: IActivityFormProps) => {
    const [activityName, setActivityName] = useState('')
    const [activityData, setActivityData] = useState({
      activityName: activityName,
      activityContactInfo: '',
      activityNote: '',
      activityStreet: '',
      activityPostalCode: '',
      activityCity: '',
      activityCountry: '',
      tripDayId: tripDayId
    })
    const [mapQuery, setMapQuery] = useState('')
    const debouncedMapQuery = useDebounce(mapQuery, 150)
    
    useEffect(() => {

      const getSearchData = async () => {        
        const results: SearchResult<RawResult>[] = await provider.search({ query: debouncedMapQuery });
        setMapResults(results)
      }
      
      if (debouncedMapQuery) { 
        getSearchData()
      } 

    }, [debouncedMapQuery])

    const createAcitivity = async () => {
        if (activityName.length === 0) return
    

        const call = await axios.post('/api/activities', {
            activityName: activityName,
            activityContactInfo: '',
            activityNote: '',
            activityStreet: '',
            activityPostalCode: '',
            activityCity: '',
            activityCountry: '',
            tripDayId: tripDayId
        })

        console.log(call.data)

        setActivityName('')

        setActivitiesState((prev) => [...prev, call.data])
    }


  return (
    <div className='text-black mt-3'>

        <div className='flex justify-between'>
            <input type={'text'} value={mapQuery} onChange={(e) => setMapQuery(e.target.value)} placeholder='Ex. Eiffel Tower' className='rounded-md p-1 w-1/2 focus:ring-0 focus:ring-offset-0 text-black border-0'/>
            <button onClick={createAcitivity} className='bg-teal-300 py-1 px-2 rounded-lg text-black hover:bg-teal-500'>Add activity</button>
            {/* TODO: Display search results */}
        </div>

        {/* <p className='mt-2'>Notes:</p>
        <textarea className='text-black outline-none rounded-md w-1/2'/> */}
    </div>
  )
}

export default activityForm