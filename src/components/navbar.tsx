import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import SailBoat from '../assets/SailBoat.svg'
import LayoutWrapper from './layoutWrapper'

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [hideState, setHideState] = useState(true)
  // console.log('auth session: ', session)

  return (
    <LayoutWrapper>
      <nav>
          <div className=''>
              <div className='flex justify-between py-4'>
                  <Link href={'/'} className='font-bold text-2xl'>Voyager</Link>

                  <div className='flex space-x-8 items-center'>
                      <Link href={'/trips'} className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Trips</Link>
                      <Link href={'/discover'} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Discover</Link>
                      <Link href={'/travelstats'} className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Travel Stats</Link>
                  </div>

                {session ? (
                    <div className='relative w-1/12' onMouseEnter={() => setHideState(!hideState)} onMouseLeave={() => setHideState(!hideState)}>
                        <Image  src={session.user?.image || ProfilePlaceholder} alt='profile avatar' width={32} height={32} className='inline-block rounded-full mr-8 cursor-pointer'/>
                        <div className='my-1'></div>
                        <div className='absolute z-10 right-1 w-full'>
                          <div className={`bg-neutral-100 text-black rounded-md p-3 ${hideState && 'hidden'}`}>
                              <div className='flex flex-col'>
                                <div onClick={() => router.push('/profile')} className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10'>Profile</div>
                                <div onClick={() => signOut()} className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10'>Sign Out</div>
                              </div>
                          </div>
                        </div>
                    </div>
                ) : (
                  // <button onClick={() => signIn()}>Sign In</button>
                  <FaUserCircle size={30} color={'black'} onClick={() => signIn()} className='cursor-pointer'/>
                )}

                {/* <Link href={'/profile'}><FaUserCircle size={30} color={'black'}/></Link> */}
            </div>
        </div>
    </nav>
  )
}

export default Navbar