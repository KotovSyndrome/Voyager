import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import SailBoat from '../assets/SailBoat.svg'
import LayoutWrapper from './layoutWrapper'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import { CgMenu, CgClose } from 'react-icons/cg'

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [toolTipHideState, setToolTipHideState] = useState(true)
  const [mobileMenuState, setMobileMenuState] = useState(false)

  const handleSignout = () => {
    signOut()
    console.log('pathname: ', router.pathname)
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  const handleMobileSignIn = () => {
    if (session?.user) {
      router.push('/profile')
    } else {
      signIn()
    }
  }


  return (
    <LayoutWrapper>
        <nav className='flex justify-between py-4'>
            <Link href={'/'} className='font-bold text-2xl'>Voyager</Link>
            {mobileMenuState ? (
                <div className='md:hidden'>
                  <CgClose onClick={() => setMobileMenuState(!mobileMenuState)} size={30} className='fixed right-10 text-red-500 z-50'/>
                </div>
              ) : (
                <CgMenu onClick={() => setMobileMenuState(!mobileMenuState)} size={30} className='md:hidden'/>
              )
            }

            {/* Desktop menu */}
            <ul className='hidden md:flex space-x-8 items-center'>
                <li>
                  <Link href={'/trips'} className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Trips</Link>
                </li>
                <li>
                  <Link href={'/discover'} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Discover</Link>
                </li>
                <li>
                  <Link href={'/travelstats'} className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Travel Stats</Link>
                </li>
            </ul>

            {/* Mobile menu */}
            <div className={`fixed right-0 top-0 h-screen w-3/5 bg-blue-300 z-40 ${!mobileMenuState && 'hidden'} md:hidden`}>
              <div className='flex flex-col justify-around items-center h-full'>
                <div className='flex flex-col items-center'>
                    <ul className='space-y-10 text-3xl'>
                      <li>
                        <Link href={'/'} onClick={() => setMobileMenuState(!mobileMenuState)} className={`${router.pathname === '/' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Home</Link>
                      </li>
                      <li>
                        <Link href={'/trips'} onClick={() => setMobileMenuState(!mobileMenuState)} className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Trips</Link>
                      </li>
                      <li>
                        <Link href={'/discover'} onClick={() => setMobileMenuState(!mobileMenuState)} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Discover</Link>
                      </li>
                      <li>
                        <Link href={'/travelstats'} onClick={() => setMobileMenuState(!mobileMenuState)} className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Travel Stats</Link>
                      </li>
                    </ul>
                </div>
                {session ? (
                  <div>
                    <div onClick={() => {
                      setMobileMenuState(!mobileMenuState)
                      router.push('/profile')
                    }} className='flex space-x-2'>
                      <p className={`text-3xl ${router.pathname === '/profile' && 'underline underline-offset-8 decoration-white'}`}>Profile</p>
                      <Image src={session?.user?.image || ProfilePlaceholder} alt='profile avatar' width={40} height={40} className='inline-block rounded-full cursor-pointer'/>
                    </div>
                    <button onClick={() => signOut()} className='bg-red-500 rounded-md py-2 px-10 mt-6'>Sign Out</button>
                  </div>
                ): (
                  <p onClick={handleMobileSignIn} className='text-3xl'>Sign In</p>
                )
              }
                
              </div>
            </div>

            {session ? (
                <div className='relative w-1.5/12 hidden md:flex justify-end' onMouseEnter={() => setToolTipHideState(!toolTipHideState)} onMouseLeave={() => setToolTipHideState(!toolTipHideState)}>
                    <Image  src={session.user?.image || ProfilePlaceholder} alt='profile avatar' width={32} height={32} className=' rounded-full cursor-pointer'/>

                    <div className='absolute z-10 right-0 top-8 w-[7rem]'>
                      <div className={`bg-neutral-100 text-black rounded-md p-3 ${toolTipHideState && 'hidden'}`}>
                          <div className='flex flex-col'>
                            <div onClick={() => router.push('/profile')} className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10'>Profile</div>
                            <div onClick={handleSignout} className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10'>Sign Out</div>
                          </div>
                      </div>
                    </div>
                </div>
            ) : (
              <FaUserCircle size={30} color={'black'} onClick={() => signIn()} className='hidden md:block cursor-pointer'/>
            )}
      </nav>
    </LayoutWrapper>
  )
}

export default Navbar