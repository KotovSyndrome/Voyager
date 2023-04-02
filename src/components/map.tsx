import React from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Marker } from 'react-leaflet'

// dynamically importing map component so that we have access to window object on the page
const LMap = dynamic(() => import('../components/LeafletMap'), {ssr: false})

const center: [number, number] = [48.2082, 16.3738]

const Map = () => {
  return (
    <LMap center={center} zoom={13}>
      <></>
    </LMap>
  )
}

export default Map