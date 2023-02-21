import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Calendar from 'react-calendar'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LayoutWrapper from '../../components/layoutWrapper';
interface IProfile {
    id: number
    bio: string
    username: string
    distanceUnits: string
    dateFormat: string
    timeFormat: string
    commentsNotification: boolean
    remindersNotification: boolean
    collaboratorJoinedNotification: boolean
  }
  interface IUser {
    email: string
    id: string
    image: string
    name: string
  }
  
  interface ISession {
    expires: Date
    user: IUser
    profile: IProfile
  }

const Plan = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const [formValues, setFormValues] = useState({
        itineraryName: '',
        destinations: '',
        isPublic: true
    })
    const router = useRouter();
    const { data: session } = useSession()

    const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.name === 'isPublic') {
            if (event.target.value === 'public') {
                setFormValues({...formValues, [event.target.name]: true});
            } else {
                setFormValues({...formValues, [event.target.name]: false});
            }
        } else {
            setFormValues({...formValues, [event.target.name]: event.target.value});
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();      
        if (!formValues.itineraryName.length || !formValues.destinations.length) return
        
        const dateArray = eachDayOfInterval({start: value[0]!, end: value[1]!});

        const testDate = new Date('February 10, 2023')

        const call = await axios.post('/api/itinerary', {
            itineraryName: formValues.itineraryName,
            startDate: testDate,
            endDate: value[1],
            days: dateArray,
            destinations: formValues.destinations, 
            isPublic: formValues.isPublic,
            // @ts-ignore
            profileId: session.profile.id,
            // Does the trip start today
            // status: value[0]?.getDate() === new Date().getDate() ? 'ACTIVE' : 'UPCOMING'
            status: 'COMPLETE'
        })

        router.push({
            pathname: '/trips/[id]',
            query: { 
                id: call.data.id
            },
          })
    }


  return (
    <LayoutWrapper>
        <div className='w-full md:w-3/4 xl:w-2/5 mt-12 mx-auto pb-10'>
            <h3 className='text-3xl font-semibold text-center'>Plan a new trip!</h3>
            <form onSubmit={handleSubmit} id="tripPlanningForm">
            <div className='mt-5'>
                <label htmlFor='itineraryName'>What would you like to call your trip?</label>
                <input onChange={handleInput} name='itineraryName' type='text' className='w-full p-1 rounded-md outline-none text-black mt-1'/>
            </div>

            <div className='mt-5'>
                <label htmlFor='destinationsList'>Where are you going?</label>
                <input onChange={handleInput} name='destinations' type='text' className='w-full p-1 rounded-md outline-none text-black mt-1'/>
                <p className='text-sm italic mt-1 text-slate-300'>Seperate destinations with a comma and space</p>
            </div>

            {/* Input for dates (calendar) */}
            <p className='mt-5'>Dates</p>
            <div className='bg-white p-3 w-full rounded-md flex text-black mt-1'>
                <p>{value[0]!.toLocaleDateString()} </p>
                &nbsp;
                <p>-</p>
                &nbsp;
                <p>{value[1]!.toLocaleDateString()}</p>
            </div>
            <div className='mt-5 w-full'>
                <Calendar 
                    onChange={onChange} 
                    value={[value[0]!, value[1]!]} 
                    goToRangeStartOnSelect={false} 
                    selectRange={true} 
                    calendarType='US' 
                    minDate={new Date()} 
                    className='m-auto text-black'
                />
            </div>

            {/* <div className='mt-5'>
                <label htmlFor='emailList'>Invite anyone going with you (optional)</label>
                <input name='emailList' type='text' className='w-full p-1 rounded-md outline-none text-black mt-1'/>
                <p className='text-sm italic mt-1 text-slate-300'>Seperate emails with a comma and space</p>
            </div> */}
            
            <div className='mt-5'>
                <label htmlFor='isPublic'>Would you like your itinerary to be discoverable by other voyagers?</label>
                <select className='block p-1 rounded-md w-full text-black mt-1 relative' name='isPublic' onChange={handleInput} >
                    <option value='public'>📢 Public</option>
                    <option value='private'>🔒 Private</option>
                </select>
                <p className='text-slate-300 text-sm italic mt-1'><AiOutlineInfoCircle size={15} className='inline-block mr-1'/>For your privacy, this will only happen once your trip is over</p>
            </div>
            </form>
            
            <div className='flex justify-center mt-5'>
                <button type="submit" form="tripPlanningForm" className='bg-cyan-400 py-2 px-8 rounded-lg text-slate-50 hover:bg-cyan-500'>Create trip</button>
            </div>
        </div> 
    </LayoutWrapper>
  )
}

export default Plan