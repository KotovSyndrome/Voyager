import React from 'react'
import TripCard from './tripCard'


const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

const monthContainer = (itineraries: any) => {
  return (
    <div className='my-12 w-full'>
        {/* @ts-ignore */}
        <h3 className='text-2xl mb-4'>{months[itineraries.startMonth]}, {itineraries.startYear}</h3>
        
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            {itineraries.itineraries.map((itin: any) => {
                const itinStartDate = new Date(itin.startDate)

                const month = itinStartDate.getMonth()
                const year = itinStartDate.getFullYear()

                // Mapping itineraries to their corresponding month and year
                if (month === itineraries.startMonth && year === itineraries.startYear) {
                    return <TripCard key={itin.id} title={itin.name} startDate={itinStartDate} endDate={new Date(itin.endDate)} collaborators={['Jason', 'Chris', 'Henry']} id={itin.id} bgImage={''}/>
                }
            })}
        </div>
    </div>
  )
}

export default monthContainer