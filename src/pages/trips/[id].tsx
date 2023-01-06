import React from 'react'
import SplitLayout from '../../components/splitLayout'
import Itinerary from '../../components/itinerary'
import Map from '../../components/map'


const tripPage = () => {

  return (
    <SplitLayout leftChildren={<Itinerary />} rightChildren={<Map />}/>
  )
}

export default tripPage

// export async function getServerSideProps() {
//    await axios.get('/api/itinerary/get')
// }