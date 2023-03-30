// import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import LandingPage from '../pages/index'

describe('Landing page', () => {
    it("should render and find the main header", () => {
        render(<LandingPage/>)

        expect(screen.queryByText("Welcome to a stress-free vacation")).toBeInTheDocument()
    })
})