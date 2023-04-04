import React, { useEffect, useState } from 'react'
import TripCard from './TripCard'

interface IMonths {
    [key: string]: string
}

const months: IMonths = {
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

interface IItineraryData {
    coverPhoto: string | null
    destinations: string
    endDate: string
    id: number
    likes: number
    profileId: number
    public: boolean
    startDate: string
    name: string
  }

interface IMonthContainer {
    startMonth: string
    startYear: string
    itineraries: IItineraryData[]
    profilePic: string
    selectedIndex: number
    monthContainersCheck: () => void
}

const MonthContainer = ({startMonth, startYear, itineraries, profilePic, selectedIndex, monthContainersCheck}: IMonthContainer) => {
    const [filteredItineraries, setFilteredItineraries] = useState(itineraries)

    useEffect(() => {
        // Comparing dates like this so that it strictly compares the day, month, and year vs down to the millisecond
        // Catches the edge case of a itinerary being created on the same day (should be active, not upcoming)
        const currentDate = new Date()
        const compareDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`)

        let filtered: IItineraryData[]

        if (selectedIndex === 0) {
            filtered = itineraries.filter((itin: any) => {

                const startDate = new Date(itin.startDate)
                const startDateCompare = new Date(`${startDate.getMonth() + 1} ${startDate.getDate()} ${startDate.getFullYear()}`)

                const endDate = new Date(itin.endDate)
                const endDateCompare = new Date(`${endDate.getMonth() + 1} ${endDate.getDate()} ${endDate.getFullYear()}`)
                
                return startDateCompare <= compareDate && compareDate <= endDateCompare
            })
        } else if (selectedIndex === 1) {
            filtered = itineraries.filter((itin: any) => {
                const startDate = new Date(itin.startDate)
                const startDateCompare = new Date(`${startDate.getMonth() + 1} ${startDate.getDate()} ${startDate.getFullYear()}`)

                return startDateCompare > compareDate
            }) 
        } else {
            filtered = itineraries.filter((itin: any) => {
                const endDate = new Date(itin.endDate)
                const endDateCompare = new Date(`${endDate.getMonth() + 1} ${endDate.getDate()} ${endDate.getFullYear()}`)

                return compareDate > endDateCompare
            })
        }

        setFilteredItineraries((prev: any) => filtered)

        monthContainersCheck()
    }, [])


  return (
    <div className='my-12 w-full'>
        {filteredItineraries.length > 0 && <h3 className='text-2xl mb-4'>{months[startMonth]}, {startYear}</h3>}
        
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredItineraries.map((itin: any) => {
                    const itinStartDate = new Date(itin.startDate)
                    const itinEndDate = new Date(itin.endDate)

                    return <TripCard key={itin.id} title={itin.name} startDate={itinStartDate} endDate={itinEndDate} collaborators={['Jason', 'Chris', 'Henry']} id={itin.id} bgImage={''} destinations={itin.destinations} profilePic={profilePic}/>
                })}
        </div>
    </div>
  )
}

export default MonthContainer
