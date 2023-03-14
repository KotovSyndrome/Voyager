import React from 'react'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import { useSession, signIn, signOut } from 'next-auth/react'

const guestNavBarButton = () => {
  const router = useRouter()

  return (
    <>
        {router.pathname === '/trips/guest' ? (
            <button onClick={() => signIn(undefined, {callbackUrl: '/trips[id]'})} className='hidden md:block bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg py-1 px-3 hover:shadow-orange-400 hover:shadow-lg'>Sign in to save</button>
        ) : (
            <FaUserCircle size={30} color={'black'} onClick={() => signIn()} className='hidden md:block cursor-pointer'/>
        )}
    </>
  )
}

export default guestNavBarButton

// bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400