import {render, screen} from '@testing-library/react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import Plan from '../pages/trips/plan'

describe('Itinerary creation', () => {
    test('Cannot create itinerary without a title', async () => {
        render(<Plan />)

        // Check that title input is empty
        const titleInputElement = await screen.findByRole('input', { name: 'itineraryName' })
        expect((titleInputElement.textContent!.length)).toBe(0)

        // get submit button
        const submitButton = await screen.findByRole('button')
        
        // fire userEvent on submit button
        userEvent.click(submitButton)
        // Check if routed
        const destinationsInputElement = await screen.findByRole('input', { name: 'destinations' })
        expect(destinationsInputElement).toBe(HTMLInputElement)
    })

    test('Can create itinerary as guest', () => {
        render(<Plan />)
        // Check signed out
        // create itinerary
        // check if routed to trips[id] page
    })

    test('Can create itinerary as user', () => {
        render(<Plan />)
        // Check signed in
        // create itinerary
        // check if routed to trips[id] page
    })
})