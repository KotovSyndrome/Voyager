import React from 'react'
import SplitLayout from '../../components/splitLayout'
import Itinerary from '../../components/itinerary'
import Map from '../../components/map'
import { prisma } from '../../server/db/client'
import { type GetServerSideProps } from 'next'

const tripPage = (itineraryData) => {

    console.log({itineraryData})

  return (
    <SplitLayout leftChildren={<Itinerary itin={itineraryData} />} rightChildren={<Map />}/>
  )
}

export default tripPage

export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
  
  // const session = await getServerAuthSession({req, res});
  // console.log('session in getServerSideProps: ', session);

  let itineraryData;

  try {           
    const data = await prisma.itinerary.findUnique({
      where: {
        id: Number(query.id),
      },
      include: {
        tripDays: true
      }
    });
    itineraryData = data;
  } catch (e) {
    console.error(e);
  }
  return { 
    props: JSON.parse(JSON.stringify(itineraryData)) 
  }
  
}