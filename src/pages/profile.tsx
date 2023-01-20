import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import Image from 'next/image'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import { profileEnd } from 'console'


interface IProfile {
  bio: string
  username: string
  distanceUnits: string
  dateFormat: string
  timeFormat: string
  commentsNotification: boolean
  remindersNotification: boolean
  collaboratorJoinedNotification: boolean
}
interface IUser {
  email: string
  id: string
  image: string
  name: string
}

interface IProfileData {
  expires: Date
  user: IUser
  profile: IProfile
}



const profile = (profileData: IProfileData) => {
  const [editing, setEditing] = useState(true)

  const handleProfileEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    //
  } 

  return (
    <div className='h-screen text-black'>
        <div className='m-auto lg:w-3/6 md:w-4/6 mt-16'>
          <div className='bg-blue-100 rounded-lg py-4 px-8'>

            <div className=' py-3 px-6 rounded-lg flex space-x-10 items-center'>
              <div>
                <p className='mb-3 text-center text-xl'>{profileData.profile.username || profileData.user.name}</p>
                <Image src={profileData.user.image || ProfilePlaceholder} alt='Profile avatart' width={100} height={100} className='rounded-full'/>
              </div>
              {/* @ts-ignore */}
              <p className='bg-slate-50 p-2 rounded-lg w-full '>{profileData.profile.bio || 'Tell the world what kind of traveler you are!'}</p>
            </div>

            <form onSubmit={handleProfileEdit} className='mt-5 bg-slate-50 px-4 pt-4 rounded-lg'>
              <div className='flex flex-col space-y-3'>
                  <h3 className='text-center text-2xl font-semibold'>Preferences</h3>

                  <div>
                    <label htmlFor='email'>Email:</label>
                    <input disabled={true} name='email'value={profileData.user.email}  className='border-[1px] border-gray-200 py-1 px-3 ml-2 rounded-md'/>
                  </div>

                  <div>
                    <label htmlFor='units'>Distance Units: </label>
                    <select disabled={true} defaultValue={profileData.profile.distanceUnits} name='units' className='rounded-md p-1 ml-1 border-gray-200'>
                      <option>Miles</option>
                      <option>Kilometers</option>
                      <option>bananas</option>
                    </select>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <label>Date format: </label>
                    <input value={'MONTH'} type='radio' id='monthFirst' readOnly={editing} defaultChecked={profileData.profile.dateFormat === 'MONTH' && true} name='dateFormatPreference' className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='monthFirst'>Month/Day <span className='text-gray-400 text-sm'>(5/23)</span></label>
                    <input value={'DAY'} type='radio' id='dayFirst' readOnly={editing} defaultChecked={profileData.profile.dateFormat === 'DAY' && true} name='dateFormatPreference' className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='dayFirst'>Day/Month <span className='text-gray-400 text-sm'>(23/5)</span></label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <label>Time format:</label>
                    <input type='radio' id='12' readOnly={editing} value={'12'} defaultChecked={profileData.profile.timeFormat === 'TWELVE' && true} name='timeFormatPreference' className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='12'>12h <span className='text-gray-400 text-sm'>(1:30pm)</span></label>
                    <input type='radio' id='24' readOnly={editing} value={'24'} defaultChecked={profileData.profile.timeFormat === 'TWENTYFOUR' && true} name='timeFormatPreference' className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='24'>24h <span className='text-gray-400 text-sm'>(13:30)</span></label>
                  </div>

                  <h3 className='text-center text-2xl font-semibold'>Email Notifications</h3>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} defaultChecked={profileData.profile.commentsNotification && true} className='border-gray-300 rounded-md text-sky-400'></input>
                    <label >Someone commented on your itinerary</label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} defaultChecked={profileData.profile.remindersNotification && true} className='border-gray-300 rounded-md text-sky-400'></input>
                    <label>Reminders about your upcoming trip</label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} defaultChecked={profileData.profile.collaboratorJoinedNotification && true} className='border-gray-300 rounded-md text-sky-400'></input>
                    <label>Your friend joined your trip as a collaborator</label>
                  </div>

                  <div className='flex justify-center'>
                    <button type='submit' className='bg-orange-300 py-2 px-6 mb-2 rounded-lg text-slate-50 hover:bg-orange-400'>Edit profile</button>
                  </div>
                </div>
            </form>
          </div>

          <div className='flex justify-center mt-10'>
            <button className='bg-red-500 py-1 px-2 rounded-md text-white text-sm hover:bg-red-700'>Delete Account</button>
          </div>

        </div>
    </div>
  )
}

export default profile

interface IServerProps {
  req: NextApiRequest
  res: NextApiResponse
}

export const getServerSideProps = async ({req, res}: IServerProps) => {
  const profileData = await getServerAuthSession({ req, res });

  return {
    props: profileData
  }
}