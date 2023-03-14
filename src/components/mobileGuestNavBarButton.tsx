import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { sign } from 'crypto'

const mobileGuestNavBarButton = () => {
    const router = useRouter()
  return (
    <>
        {router.pathname === '/trips/guest' ? (
            <button onClick={() => signIn(undefined, { callbackUrl: '/trips/[id]'})} className='bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-lg py-1 px-3'>Sign in to save</button>
        ) : (
            <p onClick={() => signIn()} className='text-3xl'>Sign In</p>
        )}
    </>
  )
}

export default mobileGuestNavBarButton