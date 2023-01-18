import React from 'react'
import SplitLayout from '../../components/splitLayout'
import Itinerary from '../../components/itinerary'
import Map from '../../components/map'
import { Query } from '@tanstack/react-query'


const tripPage = () => {

  return (
    <SplitLayout leftChildren={<Itinerary />} rightChildren={<Map />}/>
  )
}

export default tripPage

// export async function getServerSideProps({query, req}) {
  
// }