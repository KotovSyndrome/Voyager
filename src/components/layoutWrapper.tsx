import React from 'react'

const layoutWrapper = ({children}: any) => {
  return (
    <div className='flex justify-center'>
            <div className='w-8/12'>
                {children}
            </div>
    </div>
  )
}

export default layoutWrapper