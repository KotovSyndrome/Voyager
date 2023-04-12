import React, { useState } from 'react'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/router';
import LayoutWrapper from '../../components/LayoutWrapper';
import TripPlanForm from '../../components/TripPlanForm';


const Plan = () => {
    const [calendarDates, setCalendarDates] = useState([new Date(), new Date()]);
    const [formValues, setFormValues] = useState({
        itineraryName: '',
        destinations: '',
        isPublic: true
    })
    const [submitIsDisabled, setSubmitIsDisabled] = useState(false)
    const router = useRouter();

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

        setSubmitIsDisabled(true)
        
        const dateArray = eachDayOfInterval({start: calendarDates[0]!, end: calendarDates[1]!});
        
        const res = await axios.post('/api/itinerary', {
            itineraryName: formValues.itineraryName,
            startDate: calendarDates[0],
            endDate: calendarDates[1],
            days: dateArray,
            destinations: formValues.destinations, 
            isPublic: formValues.isPublic,
        })

        console.log({res})

        router.push({
            pathname: '/trips/[id]',
            query: { 
                id: res.data.id
            },
          })
    }


  return (
    <LayoutWrapper>
        <TripPlanForm 
            handleSubmit={handleSubmit} 
            handleInput={handleInput} 
            setCalendarDates={setCalendarDates} 
            calendarDates={calendarDates} 
            submitIsDisabled={submitIsDisabled}/>
    </LayoutWrapper>
  )
}

export default Plan