import React, { ReactHTML, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Calendar from 'react-calendar'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/router';

const Plan = () => {
    const [value, onChange] = useState([new Date(), new Date()]);

    const [formValues, setFormValues] = useState({
        itineraryName: '',
        destinations: '',
        isPublic: true
    })

    const router = useRouter();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {        
        event.preventDefault();
        const dateArray = eachDayOfInterval({start: value[0]!, end: value[1]!});
        const destArray = formValues.destinations.split(',');

        const call = await axios.post('/api/itinerary', {
            itineraryName: formValues.itineraryName,
            startDate: value[0],
            endDate: value[1],
            days: dateArray,
            destinations: destArray, 
            isPublic: formValues.isPublic,
            profileId: 1,  
        })

        router.push({
            pathname: '/trips/[id]',
            query: { 
                id: call.data.id
            },
          })
    }

  return (
    <div className='flex justify-center'>
        <div className='w-1/3 mt-12'>
            <h3 className='text-3xl font-semibold text-center'>Plan a new trip!</h3>
            <form onSubmit={handleSubmit} id="tripPlanningForm">
            <div className='mt-5'>
                <label htmlFor='itineraryName'>What would you like to call your trip?</label>
                <input onChange={handleInput} name='itineraryName' type='text' className='w-full p-1 rounded-md outline-none text-black'/>
            </div>

            <div className='mt-5'>
                <label htmlFor='destinationsList'>Where are you going? Please enter multiple destinations as comma-separated values. </label>
                <input onChange={handleInput} name='destinations' type='text' className='w-full p-1 rounded-md outline-none text-black'/>
            </div>

            {/* Input for dates (calendar) */}
            <p className='mt-5'>Dates</p>
            <div className='bg-white p-3 w-full rounded-md flex text-black'>
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

            <div className='mt-5'>
                <label htmlFor='emailList'>Invite anyone going with you (optional)</label>
                <input name='emailList' type='text' className='w-full p-1 rounded-md outline-none text-black'/>
                <p className='text-sm italic mt-1 text-slate-300'>Write emails seperated by a comma and a space</p>
            </div>
            
            <div className='mt-5'>
                <label htmlFor='isPublic'>Would you like your itinerary to be discoverable by other voyagers?</label>
                <select className='block p-1 rounded-md w-full'>
                    <option onChange={() => setFormValues({...formValues, isPublic: true})}>📢 Public</option>
                    <option onChange={() => setFormValues({...formValues, isPublic: false})}>🔒 Private</option>
                </select>
                <p className='text-slate-300 text-sm italic mt-1'><AiOutlineInfoCircle size={15} className='inline-block mr-1'/>For your privacy, this will only happen once your trip is over</p>
            </div>
            </form>
            
            <div className='flex justify-center mt-5'>
                <button type="submit" form="tripPlanningForm" className='bg-cyan-400 py-2 px-8 rounded-lg text-slate-50 hover:bg-cyan-500'>Create trip</button>
            </div>
        </div> 
    </div>
  )
}

export default Plan