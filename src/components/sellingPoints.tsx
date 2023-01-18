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
    <div className='mt-40'>      
      <ul className='list-disc text-xl space-y-4'>
        {points.map(p => {
          return <li key={p} className='text-2xl font-semibold'>{p}</li>
        })}
      </ul>
    </div>
  )
}

export default sellingPoints