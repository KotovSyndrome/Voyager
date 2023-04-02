import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface IModal {
    isOpen: boolean
    toggleModal: () => void
    path: string
}

const Modal = ({isOpen, toggleModal, path}: IModal) => {
    const router = useRouter()

    const routeAndDeleteItinerary = () => {
        axios.delete(`/api/itinerary/${router.query.id}`)
        toggleModal()
        router.push(path)
    }


  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-2xl font-medium leading-6 text-gray-900"
                  >
                    You're about to lose your itinerary
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-center  text-gray-500">
                      Your itinerary details will not be saved unless you are signed in. Quickly sign up to get back to planning.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => signIn()}
                    >
                      Sign up
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                      onClick={routeAndDeleteItinerary}
                    >
                      Conitnue without saving
                    </button>
                  </div>
                  <p className="text-center text-gray-500 mt-4 text-sm">Already have an account? <span onClick={() => signIn()} className='text-gray-600 font-bold cursor-pointer'>Sign in</span></p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default Modal

