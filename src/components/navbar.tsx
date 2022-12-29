import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navbar = () => {
  const router = useRouter()
  console.log('router', router)

  return (
    <nav>
        <div className='bg-sky-300 text-slate-50 rounded-bl-xl rounded-br-xl'>
            <div className='flex justify-around py-4'>
                <Link href={'/'} className='font-bold text-2xl'>Voyager🌎</Link>

                <div className='flex space-x-8'>
                    <Link href={'/trips'} className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-sky-600'} hover:text-slate-200`}>Trips</Link>
                    <Link href={'/discover'} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-sky-600'} hover:text-slate-200`}>Discover</Link>
                    <Link href={'/travelstats'} className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-sky-600'} hover:text-slate-200`}>Travel Stats</Link>
                </div>

                <Link href={'/profile'}>👤</Link>
            </div>
        </div>
    </nav>
  )
}

export default navbar