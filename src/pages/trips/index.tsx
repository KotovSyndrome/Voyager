import React, { useState } from 'react'
import { FaPlane } from 'react-icons/fa'
import TripCard from '../../components/tripCard'

const trips = () => {
    const [toggle, setToggle] = useState(false)

  return (
    <div className='relative w-4/6 m-auto'>
        <h2 className='text-center text-4xl mt-16'>Your Trips</h2>

        <div className='flex justify-center relative'>
            <p className='text-3xl mt-8'>
                <span onClick={() => setToggle(!toggle)} className={`${!toggle && 'underline underline-offset-8 decoration-cyan-600'} cursor-pointer`}>Upcoming</span>  |  <span onClick={() => setToggle(!toggle)} className={`${toggle && 'underline underline-offset-8 decoration-cyan-600'} cursor-pointer`}>Past</span>
            </p>
            <button className='bg-sky-300 text-slate-50 px-8 py-2 rounded-md absolute top-7 right-1 hover:bg-sky-500'>Plan trip <span className='inline-block text-md'><FaPlane/></span></button>
        </div>

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={1} />

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={2}/>

        <TripCard title={'Euro super trip'} startDate={new Date()} endDate={new Date()} collaborators={['Jason', 'Chris', 'Henry']} id={3}/>
    </div>
  )
} 

export default trips

// export const getServerSideProps = async () => {
//      Fetch trips (Itineraries)
// }