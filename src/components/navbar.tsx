import React from 'react'
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

                  {/* {session ? (
                      <div>
                          <Image onClick={() => router.push('/profile')} src={session.user?.image || ProfilePlaceholder} alt='profile avatar' width={32} height={32} className='inline-block rounded-full mr-8 cursor-pointer'/>
                          <button onClick={() => signOut()}>Sign Out</button>
                      </div>
                  ) : (
                    <button onClick={() => signIn()}>Sign In</button>
                  )} */}

                  {/* <button onClick={() => signIn()}>Sign In</button> */}
                  <Link href={'/profile'}><FaUserCircle size={30} color={'white'}/></Link>
              </div>
          </div>
      </nav>
    </LayoutWrapper>
  )
}

export default Navbar