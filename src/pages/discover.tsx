import React from 'react'
import ItineraryCard from '../components/itineraryCard'

const pop = [
  'Hawaii',
  'Brazil',
  'Australia',
  'Switzerland'
]

const islands = [
  'Bali, Indonesia',
  'Honolulu, Hawaii',
  'Aruba',
  'The Bahamas',
  'Jamaica',
  'Neverland',
  'Somewhere',
  'Okay island'
]

const discover = () => {
  return (
    <>
      <div className='w-4/6 m-auto mt-20'>
        <div className='flex flex-col items-center'>
          <h3 className='text-3xl text-center'>Explore destinations or see where other's have traveled</h3>

          <input type={'text'} placeholder={'search'} className='p-2 rounded-lg w-1/3 mt-10'/>

          <div className='w-full mt-5'>
            <p className='text-center text-lg'>Popular destinations</p>

            <div className='flex justify-center space-x-6 text-slate-50 mt-3'>
              {pop.map(p => <div key={p} className='bg-orange-300 py-1 px-4 rounded-lg cursor-pointer hover:scale-125 duration-300 '>{p}</div>)}
            </div>
          </div>

          <div className='grid grid-cols-4 gap-5 mt-10 pb-10'>
            {islands.map(island => {
              return <ItineraryCard 
                        key={island} 
                        title={'Romantic Getway'} 
                        location={island} 
                        creator={'user123'} 
                        likes={2178} 
                      />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default discover