import Link from 'next/link'
import React from 'react'

const footer = () => {
  return (
    <footer>
      <p className='pb-5 text-center sticky'>Made with ♡ by <Link href='https://www.linkedin.com/in/philipziolkowski/' rel="noopener noreferrer" target="_blank" className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 text-lg'>Philip Ziolkowski</Link> and <Link href='https://www.linkedin.com/in/payam-katoozian/ ' rel="noopener noreferrer" target="_blank" className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 text-lg'>Payam Katoozian</Link></p>
    </footer>
  )
}

export default footer

