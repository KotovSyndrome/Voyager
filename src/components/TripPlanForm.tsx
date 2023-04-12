import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Calendar from 'react-calendar'

interface ITripsPlanPage {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    handleInput: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    setCalendarDates: Dispatch<SetStateAction<Date[]>>
    calendarDates: Date[]
    submitIsDisabled: boolean
}

const TripPlanForm = ({handleSubmit, handleInput, setCalendarDates, calendarDates, submitIsDisabled}:  ITripsPlanPage) => {
  return (
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
                <p>{calendarDates[0]!.toLocaleDateString()} </p>
                &nbsp;
                <p>-</p>
                &nbsp;
                <p>{calendarDates[1]!.toLocaleDateString()}</p>
            </div>
            <div className='mt-5 w-full'>
                <Calendar 
                    onChange={setCalendarDates} 
                    value={[calendarDates[0]!, calendarDates[1]!]} 
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
                <button type="submit" form="tripPlanningForm" disabled={submitIsDisabled} className='bg-cyan-400 py-2 px-8 rounded-lg text-slate-50 hover:bg-cyan-500'>Create trip</button>
            </div>
    </div> 
  )
}

export default TripPlanForm