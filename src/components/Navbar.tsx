import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import { useSession, signIn, signOut } from 'next-auth/react'
import LayoutWrapper from './LayoutWrapper'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import { CgMenu, CgClose } from 'react-icons/cg'
import GuestSignInButton from './GuestSignInButton'
import Modal from './Modal'
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter()
  // const { data: session } = useSession();
  const [toolTipHideState, setToolTipHideState] = useState(true)
  const [mobileMenuState, setMobileMenuState] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [path, setPath] = useState('')

  const { user, isSignedIn, isLoaded } = useUser()

  console.log({isSignedIn})
  console.log({user})

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }


  const handleNav = (path: string, isMobile: boolean) => {
    if (isMobile) {
      setMobileMenuState(!mobileMenuState)
    }

    if (router.pathname === '/trips/[id]' && !isSignedIn) {
      setIsOpen(true)
      setPath(path)
    } else {
      router.push(path)
    }
  }


  return (
    <LayoutWrapper>
        <nav className='flex justify-between py-4'>
            <button onClick={() => handleNav('/', false)} className='font-bold text-2xl'>Voyager</button>
            {mobileMenuState ? (
                <div className='md:hidden'>
                  <CgClose onClick={() => setMobileMenuState(!mobileMenuState)} size={30} className='fixed right-10 text-red-500 z-[1002]'/>
                </div>
              ) : (
                <CgMenu onClick={() => setMobileMenuState(!mobileMenuState)} size={30} className='md:hidden'/>
              )
            }

            {/* Desktop menu */}
            <ul className='hidden md:flex space-x-8 items-center'>
                <li>
                  <button onClick={() => handleNav('/trips', false)} className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Trips</button>
                </li>
                <li>
                  <button onClick={() => handleNav('/discover', false)} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Discover</button>
                </li>
                {/* <li>
                  <button href={'/travelstats'} className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Travel Stats</button>
                </li> */}
            </ul>

            {/* Mobile menu */}
            <div className={`fixed right-0 top-0 h-screen w-3/5 bg-blue-300 z-[1001] ${!mobileMenuState && 'hidden'} md:hidden`}>
              <div className='flex flex-col justify-around items-center h-full'>
                <div className='flex flex-col items-center'>
                    <ul className='space-y-10 text-3xl'>
                      <li>
                        <button onClick={() => handleNav('/', true)} className={`${router.pathname === '/' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Home</button>
                      </li>
                      <li>
                        <button onClick={() => handleNav('/trips', true)}  className={`${router.pathname === '/trips' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Trips</button>
                      </li>
                      <li>
                        <button onClick={() => handleNav('/discover', true)} className={`${router.pathname === '/discover' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Discover</button>
                      </li>
                      {/* <li>
                        <button onClick={() => handleNav('/travelstats', true)}  className={`${router.pathname === '/travelstats' && 'underline underline-offset-8 decoration-white'} hover:text-slate-300`}>Travel Stats</button>
                      </li> */}
                    </ul>
                </div>
                {isSignedIn ? (
                  <div>
                    <div onClick={() => {
                      setMobileMenuState(!mobileMenuState)
                      router.push('/profile')
                    }} className='flex space-x-2'>
                      <p className={`text-3xl ${router.pathname === '/profile' && 'underline underline-offset-8 decoration-white'}`}>Profile</p>
                      <Image src={user.profileImageUrl || ProfilePlaceholder} alt='profile avatar' width={40} height={40} className='inline-block rounded-full cursor-pointer'/>
                    </div>
                    <SignOutButton>
                      <button className='bg-red-500 rounded-md py-2 px-10 mt-6'>Sign Out</button>
                    </SignOutButton>
                  </div>
                ): (
                  <GuestSignInButton isHidden={false}/>
                )
              }
                
              </div>
            </div>

            {isSignedIn ? (
                <div className='relative w-1.5/12 hidden md:flex justify-end' onMouseEnter={() => setToolTipHideState(!toolTipHideState)} onMouseLeave={() => setToolTipHideState(!toolTipHideState)}>
                    <Image  src={user.profileImageUrl || ProfilePlaceholder} alt='profile avatar' width={32} height={32} className=' rounded-full cursor-pointer'/>

                    <div className='absolute z-10 right-0 top-8 w-[7rem]'>
                      <div className={`bg-neutral-100 text-black rounded-md p-3 ${toolTipHideState && 'hidden'}`}>
                          <div className='flex flex-col'>
                            <div onClick={() => router.push('/profile')} className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10 text-center'>Profile</div>
                            <SignOutButton>
                              <button className='cursor-pointer hover:bg-slate-800 hover:bg-opacity-10'>Sign Out</button>
                            </SignOutButton>
                          </div>
                      </div>
                    </div>
                </div>
            ) : (
              <GuestSignInButton isHidden={true}/>
            )}
      </nav>

      <Modal isOpen={isOpen} toggleModal={toggleModal} path={path}/>
    </LayoutWrapper>
  )
}

export default Navbar
