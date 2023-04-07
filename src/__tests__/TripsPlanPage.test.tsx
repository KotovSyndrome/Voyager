import {render, screen} from '@testing-library/react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import Plan from '../pages/trips/plan'
import client, { Session } from "next-auth";
import TripPlanForm from '../components/TripPlanForm';
vi.mock("next-auth/react")

describe('Itinerary creation', () => {
    test('Cannot create itinerary without a title', async () => {
        // const mockSession: Session = {
        //     expires: "432432"
        // }

        // (client.useSession as Vi.mock).mockReturnValueOnce([mockSession, false])

        // render(<TripPlanForm  
        //         handleSubmit={async (event: React.FormEvent<HTMLFormElement>) => {}} 
        //         handleInput={async (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {}} 
        //         setCalendarDates={setCalendarDates} 
        //         calendarDates={[new Date(), new Date()]} 
        //         submitIsDisabled={false}
        // />)

        render(<Plan />)

        // Check that title input is empty
        const titleInputElement = await screen.findByRole('input', { name: 'itineraryName' })
        expect((titleInputElement.textContent!.length)).toBe(0)

        // get submit button
        const submitButton = await screen.findByRole('button')
        
        // fire userEvent on submit button
        userEvent.click(submitButton)
        
        // Check if submit button is disabled
        expect(submitButton).toNotBeDisabled()
    })

    test('Can create itinerary as guest', () => {
        // render(<Plan />)
        // Check signed out
        // create itinerary
        // check if routed to trips[id] page
    })

    test('Can create itinerary as user', () => {
        // render(<Plan />)
        // Check signed in
        // create itinerary
        // check if routed to trips[id] page
    })
})