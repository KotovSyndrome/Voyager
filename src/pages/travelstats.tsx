import React from 'react'
import GraphCard from '../components/graphCard'
import LayoutWrapper from '../components/layoutWrapper'

const graphs = [
  'Miles traveled vs National Average',
  'Cities visited per trip',
  'Distribution of method of travel',
  'Percentage of the world seen'
]

const travelstats = () => {
  return (

    <LayoutWrapper>
      <div className='w-full'>
        <div className='grid grid-cols-2 gap-10 mt-10 pb-10'>
          {graphs.map(g => {
            return <GraphCard key={g} title={g}/>
          })}
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default travelstats