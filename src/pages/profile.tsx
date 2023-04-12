import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import Image from 'next/image'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import LayoutWrapper from '../components/LayoutWrapper'
import { getAuth, buildClerkProps, } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import Loader from '../components/Loader'
import { prisma } from '../server/db/client'
interface IProfileData {
  profileData: {
    clerkId: number
    bio: string
    distanceUnits: string
    dateFormat: string
    timeFormat: string
    commentsNotification: boolean
    remindersNotification: boolean
    collaboratorJoinedNotification: boolean
  }
}

const profile = ({ profileData } : IProfileData) => {
  const { user, isLoaded } = useUser()
  const [editing, setEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    bio: profileData.bio || 'Tell the world what kind of traveler you are!',
    distanceUnits: profileData.distanceUnits,
    dateFormat: profileData.dateFormat,
    timeFormat: profileData.timeFormat,
    commentsNotification: profileData.commentsNotification,
    remindersNotification: profileData.remindersNotification,
    collaboratorNotification: profileData.collaboratorJoinedNotification
  })


  useEffect(() => {
    if (user?.fullName) {
      setFormValues(prevState => ({
        ...prevState,
        username: user.fullName!
      }));
    } else if (user?.username) {
      setFormValues(prevState => ({
        ...prevState,
        username: user.username!
      }));

    } else if  (user?.firstName) {
      setFormValues(prevState => ({
        ...prevState,
        username: user.firstName!
      }));
    }
  }, [isLoaded])

  if (!isLoaded) return <Loader />

  const handleInput = (e: any) => {
    if (e.target.name.includes('Notification')) {
      setFormValues({...formValues, [e.target.name]: e.target.checked})
    } else {
      setFormValues({...formValues, [e.target.name]: e.target.value})
    }
  }



  const handleProfileEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const call = await axios.put('/api/profile', {
      bio: formValues.bio,
      distanceUnits: formValues.distanceUnits,
      dateFormat: formValues.dateFormat,
      timeFormat: formValues.timeFormat,
      commentsNotification: formValues.commentsNotification,
      remindersNotification: formValues.remindersNotification,
      collaboratorNotification: formValues.collaboratorNotification
    })


    setEditing(editing => !editing)
  }


  return (
    <LayoutWrapper>
      <div className='pb-10 text-black'>
          <div className='m-auto lg:w-5/6 xl:w-4/6 mt-16'>
            <div className='bg-blue-100 rounded-lg py-4 px-4'>

              <div className='grid grid-cols-1 '>
                <div className='mx-auto mb-4'>
                  <input type='text' onChange={handleInput} value={formValues.username} disabled={!editing} name='username' className='border-0 outline-none bg-transparent text-xl mx-auto text-center'/>
                  <Image src={user?.profileImageUrl || ProfilePlaceholder} alt='Profile avatart' width={100} height={100} className='rounded-full mx-auto'/>
                </div>
                <textarea onChange={handleInput} value={formValues.bio} disabled={!editing} name='bio' className='bg-slate-50 p-2 rounded-lg w-full h-40 border-0 resize-none '></textarea>
              </div>

              <section className='mt-5 bg-slate-50 px-4 pt-4 rounded-lg'>
                <h3 className='text-center text-2xl font-semibold'>Preferences</h3>

                <form onSubmit={handleProfileEdit} id='profileForm' className='mt-6'>
                  <div className='space-y-6'>
                    <div className='flex flex-col space-y-3'>
                      <label htmlFor='email' className='font-bold'>Email</label>
                      <input disabled={true} name='email' value={user?.primaryEmailAddress?.emailAddress}  className='border-[1px] border-gray-200 py-1 px-3 rounded-md w-fit'/>
                    </div>

                    <div className='flex flex-col space-y-2 space-x-2'>
                      <label htmlFor='units' className='font-bold'>Distance Units</label>
                      
                      <div className='space-x-4'>
                        <input onChange={handleInput} value={'MILES'} type='radio' disabled={!editing} defaultChecked={profileData.distanceUnits === 'MILES'} id='milesFormat' name='distanceUnits' className='text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='milesFormat' className=''>Miles <span className='text-gray-400 text-sm'>(mi)</span></label>
                      </div>

                      <div className='space-x-4'>
                        <input onChange={handleInput} type='radio' value={'KILOMETERS'} disabled={!editing} defaultChecked={profileData.distanceUnits === 'KILOMETERS'} id='kilometersFormat' name='distanceUnits' className=' text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='kilometersFormat'>Kilometers <span className='text-gray-400 text-sm'>(km)</span></label>
                      </div>

                      <div className='space-x-4'>
                        <input onChange={handleInput} type='radio' value={'BANANAS'} disabled={!editing} defaultChecked={profileData.distanceUnits === 'BANANAS'} id='bananasFormat' name='distanceUnits' className=' text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='bananasFormat'>Bananas <span className='text-gray-400 text-sm'>(🍌)</span></label>
                      </div>
                    </div>

                    <div className='flex flex-col space-y-2 space-x-2'>
                      <label className='font-bold'>Date format</label>
                      <div className='space-x-4'>
                        <input onChange={handleInput} value={'MONTH'} type='radio' id='monthFirst' disabled={!editing} defaultChecked={profileData.dateFormat === 'MONTH'} name='dateFormat' className='text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='monthFirst'>Month/Day <span className='text-gray-400 text-sm'>(5/23)</span></label>
                      </div>
                      <div className='space-x-4'>
                        <input onChange={handleInput} value={'DAY'} type='radio' id='dayFirst' disabled={!editing} defaultChecked={profileData.dateFormat === 'DAY'} name='dateFormat' className='text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='dayFirst'>Day/Month <span className='text-gray-400 text-sm'>(23/5)</span></label>
                      </div>
                    </div>

                    <div className='flex flex-col space-y-2 space-x-2'>
                      <label className='font-bold'>Time format</label>

                      <div className='space-x-4'>
                        <input onChange={handleInput} type='radio' id='12' disabled={!editing} value={'TWELVE'} defaultChecked={profileData.timeFormat === 'TWELVE'} name='timeFormat' className=' text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='12'>12h <span className='text-gray-400 text-sm'>(1:30pm)</span></label>
                      </div>
                      <div className='space-x-4'>
                        <input onChange={handleInput} type='radio' id='24' disabled={!editing} value={'TWENTYFOUR'} defaultChecked={profileData.timeFormat === 'TWENTYFOUR'} name='timeFormat' className='text-sky-400 border-gray-300 w-5 h-5'/>
                        <label htmlFor='24'>24h <span className='text-gray-400 text-sm'>(13:30)</span></label>
                      </div>
                    </div>
                  </div>
                  <h3 className='text-center text-2xl font-semibold my-6'>Email Notifications</h3>

                  <div className='space-y-2'>
                    <div className='block custom1:flex md:items-center items space-x-2'>
                      <input onChange={handleInput} type='checkbox' disabled={!editing} defaultChecked={profileData.commentsNotification} id='commented' name='commentsNotification' className='border-gray-300 rounded-md text-sky-400 w-5 h-5'></input>
                      <label htmlFor='commented'>Someone commented on your itinerary</label>
                    </div>

                    <div className='block custom1:flex md:items-center items space-x-2'>
                      <input onChange={handleInput} type='checkbox' disabled={!editing} defaultChecked={profileData.remindersNotification} id='reminders' name='remindersNotification' className='border-gray-300 rounded-md text-sky-400 w-5 h-5'></input>
                      <label htmlFor='reminders'>Reminders about your upcoming trip</label>
                    </div>

                    <div className='block custom1:flex md:items-center items space-x-2'>
                      <input onChange={handleInput} type='checkbox' disabled={!editing} defaultChecked={profileData.collaboratorJoinedNotification} id='friendJoined' name='collaboratorNotification' className='border-gray-300 rounded-md text-sky-400 w-5 h-5'></input>
                      <label htmlFor='friendJoined'>Your friend joined your trip as a collaborator</label>
                    </div>
                  </div>
                </form>

                <div className='flex justify-center mt-6'>
                  {/* Rendering buttons like this so they are not both submitting the form. Rendering with ternary causes both to submit the form for some reason🤔 */}
                  {editing && <button type='submit' form='profileForm' className='bg-green-300 py-2 px-6 mb-2 rounded-lg text-slate-50 hover:bg-green-400'>Save Changes</button>}
                  {!editing && <button type='button' onClick={() => setEditing(!editing)} className='bg-orange-300 py-2 px-6 mb-2 rounded-lg text-slate-50 hover:bg-orange-400'>Edit profile</button>}
                </div>
              </section>
            </div>

            {/* <div className='flex justify-center mt-10 pb-10'>
              <button className='bg-red-500 py-1 px-2 rounded-md text-white text-sm hover:bg-red-700'>Delete Account</button>
            </div> */}

          </div>
      </div>
    </LayoutWrapper>
  )
}

export default profile


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const profileData = await getServerAuthSession({ req, res });

  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  let profileData

  try {
    profileData = await prisma.profile.findUnique({
      where: { clerkId: userId }
    })
  } catch (error) {
    console.error(error)
  }


  return {
    props: { ...buildClerkProps(ctx.req), profileData: profileData}
  }

  // handle case if profileData dosen't return anything
}


