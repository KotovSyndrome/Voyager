import React from 'react'
import GraphCard from '../components/graphCard'

const graphs = [
  'Miles traveled vs National Average',
  'Cities visited per trip',
  'Distribution of method of travel',
  'Percentage of the world seen'
]

const travelstats = () => {
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-2 gap-10 w-10/12 mt-10 pb-10'>
        {graphs.map(g => {
          return <GraphCard key={g} title={g}/>
        })}
      </div>
    </div>
  )
}

export default travelstats