import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const profile = () => {
  return (
    <div className=''>
        <div className='m-auto lg:w-3/6 md:w-4/6 mt-16'>
          <div className='bg-zinc-200 rounded-lg py-4 px-8'>

            <div className='bg-slate-300 py-3 px-6 rounded-lg flex space-x-10 items-center'>
              <div >
                <p className='mb-3'>User123</p>
                <FaUserCircle size={60}/>
              </div>
              <p className='bg-slate-50 p-2 rounded-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div className='mt-5 bg-slate-300 px-4 pt-4 rounded-lg'>
              <p className='mb-3'>Email: johndoe123@gmail.com</p>

              <label htmlFor='units'>Distance Units: </label>
              <select name='units' className='rounded-md p-1 mb-3'>
                <option>Miles</option>
                <option>Kilometers</option>
                <option>bananas</option>
              </select>

              <p className='pb-64'>Likes: 831</p>
              <div className='flex justify-center'>
                <button className='bg-rose-300 py-2 px-6 mb-2 rounded-lg text-slate-50 hover:bg-rose-400'>Edit profile</button>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default profile