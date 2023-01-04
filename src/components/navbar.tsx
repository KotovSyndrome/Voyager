import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession();
  console.log('auth session: ', session)

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

                {session ? (
                    <div>
                        <Image onClick={() => router.push('/profile')} src={session.user?.image || ProfilePlaceholder} alt='profile avatar' width={32} height={32} className='inline-block rounded-full mr-8 cursor-pointer'/>
                        <button onClick={() => signOut()}>Sign Out</button>
                    </div>
                ) : (
                  <button onClick={() => signIn()}>Sign In</button>
                )}

                {/* <button onClick={() => signIn()}>Sign In</button> */}
                <Link href={'/profile'}><FaUserCircle size={30} color={'black'}/></Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar