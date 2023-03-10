import React, { useEffect, useState } from 'react'
import TripCard from './tripCard'


const months = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
}

const monthContainer = (itineraries: any) => {
    const [filteredItineraries, setFilteredItineraries] = useState(itineraries.itineraries)

    useEffect(() => {
        // Comparing dates like this so that it strictly compares the day, month, and year vs down to the millisecond
        // Catches the edge case of a itinerary being created on the same day (should be active, not upcoming)
        const currentDate = new Date()
        const compareDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`)

        let filtered: []

        if (itineraries.tripStatusFilter === 'ACTIVE') {
            filtered = itineraries.itineraries.filter((itin: any) => {

                const startDate = new Date(itin.startDate)
                const startDateCompare = new Date(`${startDate.getMonth() + 1} ${startDate.getDate()} ${startDate.getFullYear()}`)

                const endDate = new Date(itin.endDate)
                const endDateCompare = new Date(`${endDate.getMonth() + 1} ${endDate.getDate()} ${endDate.getFullYear()}`)
                
                return startDateCompare <= compareDate && compareDate <= endDateCompare
            })
        } else if (itineraries.tripStatusFilter === 'UPCOMING') {
            filtered = itineraries.itineraries.filter((itin: any) => {
                const startDate = new Date(itin.startDate)
                const startDateCompare = new Date(`${startDate.getMonth() + 1} ${startDate.getDate()} ${startDate.getFullYear()}`)

                return startDateCompare > compareDate
            }) 
        } else {
            filtered = itineraries.itineraries.filter((itin: any) => {
                const endDate = new Date(itin.endDate)
                const endDateCompare = new Date(`${endDate.getMonth() + 1} ${endDate.getDate()} ${endDate.getFullYear()}`)

                return compareDate > endDateCompare
            })
        }

        setFilteredItineraries((prev: any) => filtered)
    }, [itineraries.tripStatusFilter])

  return (
    <div className='my-12 w-full'>
        {/* @ts-ignore */}
        {filteredItineraries.length > 0 && <h3 className='text-2xl mb-4'>{months[itineraries.startMonth]}, {itineraries.startYear}</h3>}
        
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredItineraries.map((itin: any) => {
                    let itinStartDate = new Date(itin.startDate)
                    let itinEndDate = new Date(itin.endDate)


                    const month = itinStartDate.getMonth()
                    const year = itinStartDate.getFullYear()

                    // Mapping itineraries to their corresponding month and year
                    if (month === itineraries.startMonth && year === itineraries.startYear) {
                        return <TripCard key={itin.id} title={itin.name} startDate={itinStartDate} endDate={itinEndDate} collaborators={['Jason', 'Chris', 'Henry']} id={itin.id} bgImage={''} destinations={itin.destinations} profilePic={itineraries.profilePic}/>
                    }
                })}
        </div>

        {itineraries.tripStatusFilter === 'UPCOMING' && !filteredItineraries.length && (
            <p className='text-center text-xl'>You don't have any upcoming trips.</p>
        )}

        {itineraries.tripStatusFilter === 'COMPLETE' && !filteredItineraries.length && (
            <p className='text-center text-xl'>You don't have any past trips.</p>
        )}
    </div>
  )
}

export default monthContainer