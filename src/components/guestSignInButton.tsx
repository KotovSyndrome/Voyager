import React from 'react'
import { signIn } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { boolean } from 'zod'

interface IProps {
    isHidden: boolean
}

const GuestSignInButton = ({isHidden}: IProps) => {
  const router = useRouter()

  return (
    <>
        {router.pathname === '/trips/[id]' ?  
            <button onClick={() => signIn()} className={`${isHidden && 'hidden md:block'} rounded-lg px-4 py-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500`}>Sign up to save</button> : 
            <button onClick={() => signIn()} className={`${isHidden && 'hidden md:block'} text-xl`}>Sign in <FaUserCircle size={30} color={'black'} className={`inline-block ml-2 cursor-pointer`}/></button>
        }
    </>
  )
}

export default GuestSignInButton
