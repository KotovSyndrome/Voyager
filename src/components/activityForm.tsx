import React, { useState, Dispatch, SetStateAction, useEffect, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
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
    const [selectedResult, setSelectedResult] = useState({
      x: 0,
      y: 0,
      label: '',
      bounds: null,
      raw: {}
    });
    const [localResults, setLocalResults] = useState<SearchResult<RawResult>[]>([])
    // const [localResults, setLocalResults] = useState({
    //   x: 0,
    //   y: 0,
    //   label: '',
    //   bounds: null,
    //   raw: {}
    // });
    
    useEffect(() => {

      const getSearchData = async () => {        
        const results: SearchResult<RawResult>[] = await provider.search({ query: debouncedMapQuery });
        setLocalResults(results)
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
            {/* <input type={'text'} value={mapQuery} onChange={(e) => setMapQuery(e.target.value)} placeholder='Ex. Eiffel Tower' className='rounded-md p-1 w-1/2 focus:ring-0 focus:ring-offset-0 text-black border-0'/> */}
            <Combobox onChange={setSelectedResult}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    displayValue={(location) => location.label}
                    onChange={(event) => setMapQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setMapQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {!localResults.length && mapQuery !== '' ? 
                      (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : 
                      (
                        localResults.map((location, index) => (
                          <Combobox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={location}
                          >
                            {({selected, active}) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {location.label}
                                </span>
                                {selected ? (
                                  <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )} 

                          </Combobox.Option>
                        ))
                      )
                    }
                  </Combobox.Options>
                </Transition>
              </div> 
            </Combobox>
            <button onClick={createAcitivity} className='bg-teal-300 py-1 px-2 rounded-lg text-black hover:bg-teal-500'>Add activity</button>
            {/* TODO: Display search results */}
        </div>

        {/* <p className='mt-2'>Notes:</p>
        <textarea className='text-black outline-none rounded-md w-1/2'/> */}
    </div>
  )
}

export default activityForm