import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import ProfilePlaceholder from '../assets/profile-placeholder.png'
import Image from 'next/image'

const profile = () => {
  const { data: session } = useSession()
  const [editing, setEditing] = useState(true)

  const handleProfileEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    //
  } 

  return (
    <div className='h-screen text-black'>
        <div className='m-auto lg:w-3/6 md:w-4/6 mt-16'>
          <div className='bg-blue-100 rounded-lg py-4 px-8'>

            <div className=' py-3 px-6 rounded-lg flex space-x-10 items-center'>
              <div className='w-3/4'>
                <p className='mb-3 text-center text-xl'>{session?.user?.name}</p>
                <Image src={session?.user?.image || ProfilePlaceholder} alt='Profile avatart' width={100} height={100} className='rounded-full'/>
              </div>
              <p className='bg-slate-50 p-2 rounded-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <form onSubmit={handleProfileEdit} className='mt-5 bg-slate-50 px-4 pt-4 rounded-lg'>
              <div className='flex flex-col space-y-3'>
                  <h3 className='text-center text-2xl font-semibold'>Preferences</h3>

                  <div>
                    <label htmlFor='email'>Email:</label>
                    <input disabled={true} name='email'value={session?.user?.email!}  className='border-[1px] border-gray-200 p-1 ml-2 rounded-md'/>
                  </div>

                  <div>
                    <label htmlFor='units'>Distance Units: </label>
                    <select disabled={true} name='units' className='rounded-md p-1 ml-1 border-gray-200'>
                      <option>Miles</option>
                      <option>Kilometers</option>
                      <option>bananas</option>
                    </select>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <label>Date format: </label>
                    <input type='radio' id='monthFirst' readOnly={editing} value={'monthFirst'} className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='monthFirst'>Month/Day <span className='text-gray-400 text-sm'>(5/23)</span></label>
                    <input type='radio' id='dayFirst' readOnly={editing} value={'dayFirst'} className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='dayFirst'>Day/Month <span className='text-gray-400 text-sm'>(23/5)</span></label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <label>Time format:</label>
                    <input type='radio' id='12' readOnly={editing} value={'12'} className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='12'>12h <span className='text-gray-400 text-sm'>(1:30pm)</span></label>
                    <input type='radio' id='24' readOnly={editing} value={'24'} className='rounded-md text-sky-400 border-gray-300'/>
                    <label htmlFor='24'>24h <span className='text-gray-400 text-sm'>(13:30)</span></label>
                  </div>

                  <h3 className='text-center text-2xl font-semibold'>Email Notifications</h3>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} className='border-gray-300 rounded-md text-sky-400'></input>
                    <label >Someone commented on your itinerary</label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} className='border-gray-300 rounded-md text-sky-400'></input>
                    <label>Reminders about your upcoming trip</label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input type='checkbox'  value={'true'} className='border-gray-300 rounded-md text-sky-400'></input>
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

// export const getServerSideProps = async () => {
//   // get user data (bio, total likes from all itineraries)
// }