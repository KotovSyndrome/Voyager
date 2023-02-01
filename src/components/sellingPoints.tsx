import React from 'react'


const points = [
  'All your trip details in one place',
  'Discover new attractions',
  'Search other travelers itineraries',
  'Collaborate with others',
  'And so much more...'
]

const sellingPoints = () => {
  return ( 
    <ul className='list-disc text-xl space-y-4 m-auto'>
      {points.map(p => {
        return <li key={p} className='text-xl md:text-2xl font-semibold'>{p}</li>
      })}
    </ul>
  )
}

export default sellingPoints