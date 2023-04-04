import React from 'react'

const LayoutWrapper = ({children}: any) => {
  return (
    <div className='flex justify-center w-full'>
            <div className='w-10/12 lg:w-8/12'>
                {children}
            </div>
    </div>
  )
}

export default LayoutWrapper
