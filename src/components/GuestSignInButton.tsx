import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { SignUpButton, SignInButton } from "@clerk/nextjs";

interface IProps {
    isHidden: boolean
}

const GuestSignInButton = ({isHidden}: IProps) => {
  const router = useRouter()

  return (
    <>
        {router.pathname === '/trips/[id]' ?  
            (<SignUpButton redirectUrl={`/trips/${router.query.id}`}>
              <button className={`${isHidden && 'hidden md:block'} rounded-lg px-4 py-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:shadow-orange-400 hover:shadow-lg`}>Sign up to save</button>
            </SignUpButton>)
            : 
            (<SignInButton>
                <button className={`${isHidden && 'hidden md:block'} text-xl`}><FaUserCircle size={30} color={'black'} className={`inline-block ml-2 cursor-pointer`}/></button>
              </SignInButton>)
        }
    </>
  )
}

export default GuestSignInButton
