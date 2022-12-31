import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const plan = () => {
    const [value, onChange] = useState([new Date(), new Date()]);

    console.log({value})

  return (
    <div className='flex justify-center'>
        <div className='w-1/3 mt-12'>
            <h3 className='text-3xl font-semibold text-center'>Plan a new trip!</h3>
            
            <div className='mt-10'>
                <label>Where are you going?</label>
                <input type='text' className='w-full p-1 rounded-md outline-none'/>
            </div>

            {/* Input for dates (calendar) */}
            <p className='mt-5'>Dates</p>
            <div className='bg-white p-3 w-full rounded-md flex'>
                <p>{value[0]!.toLocaleDateString()} -</p>
                <p>- {value[1]!.toLocaleDateString()}</p>
            </div>
            <div className='mt-5 w-full'>
                <Calendar onChange={onChange} value={[value[0]!, value[1]!]} goToRangeStartOnSelect={false} selectRange={true} calendarType='US' minDate={new Date()} className='m-auto'/>
            </div>

            <div className='mt-5'>
                <label>Invite anyone going with you (optional)</label>
                <input type='text' className='w-full p-1 rounded-md outline-none'/>
                <p className='text-sm italic mt-1 text-slate-300'>Write emails seperated by a comma and a space</p>
            </div>
            
            <div className='mt-5'>
                <label>Would you like your itinerary to be discoverable by other voyagers?</label>
                <select className='block p-1 rounded-md w-full'>
                    <option>📢 Public</option>
                    <option>🔒 Private</option>
                </select>
                <p className='text-slate-300 text-sm italic mt-1'><AiOutlineInfoCircle size={15} className='inline-block mr-1'/>For your privacy, this will only happen once your trip is over</p>
            </div>
            
            <div className='flex justify-center mt-5'>
                <button className='bg-cyan-400 py-2 px-8 rounded-lg text-slate-50 hover:bg-cyan-500'>Create trip</button>
            </div>
        </div> 
    </div>
  )
}

export default plan