import React from 'react'

const layoutWrapper = ({children}: any) => {
  return (
    <div className='flex justify-center w-full'>
            <div className='w-10/12 md:w-8/12'>
                {children}
            </div>
    </div>
  )
}

export default layoutWrapper