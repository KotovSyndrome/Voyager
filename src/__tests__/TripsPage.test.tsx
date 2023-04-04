import TabPanelContainer from '../components/TabPanelContainer'
import {render, screen} from '@testing-library/react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'

const itinerariesByDate = {
    "11-1969": [
        {
            "id": 13,
            "name": "Whatever",
            "startDate": "1970-01-01T00:00:00.000Z",
            "endDate": "1970-01-02T00:00:00.000Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "Whever",
            "coverPhoto": "https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg",
            "ipAddress": null
        },
        {
            "id": 18,
            "name": "Past trip",
            "startDate": "1970-01-01T00:00:00.000Z",
            "endDate": "1970-02-20T00:00:00.000Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "Paris, Brussels",
            "coverPhoto": null,
            "ipAddress": null
        }
    ],
    "2-2023": [
        {
            "id": 16,
            "name": "Current",
            "startDate": "2023-03-31T19:22:02.175Z",
            "endDate": "2023-04-02T19:22:02.175Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "California, Arizona",
            "coverPhoto": null,
            "ipAddress": null
        },
        {
            "id": 17,
            "name": "Current #2 ",
            "startDate": "2023-03-31T19:22:02.175Z",
            "endDate": "2023-04-05T19:22:02.175Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "Boston",
            "coverPhoto": null,
            "ipAddress": null
        }
    ],
    "3-2023": [
        {
            "id": 14,
            "name": "Upcoming test trip",
            "startDate": "2023-04-09T19:52:38.673Z",
            "endDate": "2023-04-10T19:52:38.673Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "Loola",
            "coverPhoto": null,
            "ipAddress": null
        },
        {
            "id": 15,
            "name": "Upcoming 2",
            "startDate": "2023-04-15T19:52:38.673Z",
            "endDate": "2023-04-21T19:52:38.673Z",
            "profileId": 4,
            "likes": 0,
            "public": true,
            "destinations": "Latvia, Czech Republic",
            "coverPhoto": null,
            "ipAddress": null
        }
    ]
}

const getDates = (text: string) => {
    let idxOfDash = text.indexOf('-')

    const getStartDate = text.substring(0, idxOfDash - 1)
    const startDate = new Date(getStartDate)
    const startDateCompare = new Date(`${startDate.getMonth() + 1} ${startDate.getDate()} ${startDate.getFullYear()}`)

    const getEndDate = text.substring(idxOfDash + 2)
    const endDate = new Date(getEndDate)
    const endDateCompare = new Date(`${endDate.getMonth() + 1} ${endDate.getDate()} ${endDate.getFullYear()}`)

    return [startDateCompare.getTime(), endDateCompare.getTime()]
}

describe("Filter tabs", () => {
    it("Should only show current trips", () => {
        render(<TabPanelContainer itinerariesByDate={itinerariesByDate} selectedFilter='CURRENT' profilePic='' selectedIndex={0}/>)

        const dateTextElements = screen.getAllByTitle('itinerary-date')

        const dateElementsArr = Array.from(dateTextElements)

        setTimeout(() => {
            dateElementsArr.forEach(element => {

                let text = element.innerText
    
                const transformedDates = getDates(text)
    
                const currentDate = new Date()
                const compareDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`)
        
                expect(transformedDates[0]).toBeLessThanOrEqual(compareDate.getTime())
                expect(compareDate.getTime()).toBeLessThanOrEqual(transformedDates[1]!)
            })
        }, 150)

    })  


    it("Should only show upcoming trips", () => {
        render(<TabPanelContainer itinerariesByDate={itinerariesByDate} selectedFilter='UPCOMING' profilePic='' selectedIndex={1}/>)

        const dateTextElements = screen.getAllByTitle('itinerary-date')

        const dateElementsArr = Array.from(dateTextElements)

        setTimeout(() => {
            dateElementsArr.forEach(element => {

                let text = element.innerText
    
                const transformedDates = getDates(text)
    
                const currentDate = new Date()
                const compareDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`)
        
                expect(transformedDates[0]).toBeGreaterThan(compareDate.getTime())
            })
        }, 150)

    })

    it("Should only show past trips", () => {
        render(<TabPanelContainer itinerariesByDate={itinerariesByDate} selectedFilter='PAST' profilePic='' selectedIndex={2}/>)

        const dateTextElements = screen.getAllByTitle('itinerary-date')

        const dateElementsArr = Array.from(dateTextElements)

        setTimeout(() => {
            dateElementsArr.forEach(element => {

                let text = element.innerText
    
                const transformedDates = getDates(text)
    
                const currentDate = new Date()
                const compareDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`)
        
                expect(compareDate.getTime()).toBeGreaterThan(transformedDates[1]!)
            })
        }, 150)
    })
})
