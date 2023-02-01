import React from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'

const demoItinerary = () => {
  return (
    <div className='w-full mt-8'>
      <div className="bg-demoBG bg-cover text-white bg-center w-full p-3 rounded-lg drop-shadow-md">
        <p className='text-2xl font-extrabold'>Paris Trip</p>
        <p className='font-semibold'>6/20/23 - 7/02/23</p>
        <p className='text-right mt-7 font-semibold '>Philip, Payam, and 3 others</p>
      </div>

      {/* w-full mt-5 px-3 py-6 flex flex-col items-center space-y-3 */}
      {/* <div className='bg-blue-100 flex justify-center drop-shadow-md rounded-md mt-5 py-5'>
          <div className='grid grid-cols-1 divide-y divide-white text-black'>
          <div className=' p-3'>
            <div className='flex justify-between'>
                <p className='mb-3 text-xl font-semibold'>Thursday, 6/18</p>
                <div className='space-x-3'>
                </div>
            </div>

            <div className='flex justify-between space-x-5'>
                <div className='flex space-x-2'>
                    <input className='bg-white bg-opacity-40 rounded-md p-1 outline-none' value={'The Louvre Museum'} readOnly/>
                    <input value={'10:00 AM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <p>to</p>
                    <input value={'02:00 PM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <button className='bg-indigo-300 p-1 rounded-md cursor-default'><TbNotes size={20}/></button>
                </div>

                <div className='space-x-1'>
                    <button className='bg-orange-300 p-1 rounded-md cursor-default'><AiFillEdit size={20}/></button>
                    <button className='bg-red-300 p-1 rounded-md cursor-default'><BsTrashFill size={20}/></button>
                </div>
              </div>
          </div>



          <div className='p-3 text-black'>
            <div className='flex justify-between'>
                <p className='mb-3 text-xl font-semibold'>Friday, 6/19</p>
                <div className='space-x-3'>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex space-x-2'>
                    <input className='bg-white bg-opacity-40 rounded-md p-1 outline-none' value={'Arc de Triomphe'} readOnly/>
                    <input value={'10:00 AM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <p>to</p>
                    <input value={'02:00 PM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <button className='bg-indigo-300 p-1 rounded-md cursor-default'><TbNotes size={20}/></button>
                </div>

                <div className='space-x-1'>
                    <button className='bg-orange-300 p-1 rounded-md cursor-default'><AiFillEdit size={20}/></button>
                    <button className='bg-red-300 p-1 rounded-md cursor-default'><BsTrashFill size={20}/></button>
                </div>
              </div>
          </div>


          <div className=' p-3 text-black '>
            <div className='flex justify-between'>
                <p className='mb-3 text-xl font-semibold'>Saturday, 6/20</p>
                <div className='space-x-3'>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex space-x-2'>
                    <input className='bg-white bg-opacity-40 rounded-md p-1 outline-none' value={'Cathédrale Notre-Dame'} readOnly/>
                    <input value={'10:00 AM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <p>to</p>
                    <input value={'02:00 PM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <button className='bg-indigo-300 p-1 rounded-md cursor-default'><TbNotes size={20}/></button>
                </div>

                <div className='space-x-1'>
                    <button className='bg-orange-300 p-1 rounded-md cursor-default'><AiFillEdit size={20}/></button>
                    <button className='bg-red-300 p-1 rounded-md cursor-default'><BsTrashFill size={20}/></button>
                </div>
              </div>
          </div>


        <div className='p-3 text-black'>
            <div className='flex justify-between'>
                <p className='mb-3 text-xl font-semibold'>Sunday, 6/21</p>
                <div className='space-x-3'>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex space-x-2'>
                    <input className='bg-white bg-opacity-40 rounded-md p-1 outline-none' value={'Tuileries Garden'} readOnly/>
                    <input value={'10:00 AM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <p>to</p>
                    <input value={'02:00 PM'} readOnly className='bg-white bg-opacity-40 rounded-md p-1 w-20 outline-none'/>
                    <button className='bg-indigo-300 p-1 rounded-md cursor-default'><TbNotes size={20}/></button>
                </div>

                <div className='space-x-1'>
                    <button className='bg-orange-300 p-1 rounded-md cursor-default'><AiFillEdit size={20}/></button>
                    <button className='bg-red-300 p-1 rounded-md cursor-default'><BsTrashFill size={20}/></button>
                </div>
              </div>
          </div>
        </div>
        </div> */}
    </div>
  )
}

export default demoItinerary