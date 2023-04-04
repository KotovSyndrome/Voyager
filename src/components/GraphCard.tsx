import React from 'react'

interface IGraphCard {
    title: string
}

const GraphCard = ({ title }: IGraphCard) => {
  return (
    <div>
        <p className='text-center font-semibold text-xl'>{title}</p>

        <div className='bg-gray-200 p-28 md:p-44 rounded-lg mt-2 text-center'>
            Graph goes here
        </div>
    </div>
  )
}

export default GraphCard
