import React from 'react'

const navbar = () => {
  return (
    <nav>
        <div className='bg-sky-300 text-slate-50 rounded-bl-xl rounded-br-xl'>
            <div className='flex justify-around py-4'>
                <h3 className='font-bold text-2xl'>Voyager🌎</h3>

                <div className='flex space-x-8'>
                    <p>Trips</p>
                    <p>Discover</p>
                    <p>Travel Stats</p>
                </div>

                <p>👤</p>
            </div>
        </div>
    </nav>
  )
}

export default navbar