import React from 'react'

const splitLayout = ({ leftChildren, rightChildren }: any) => {
  return (
    <div className='flex w-screen h-screen'>
        <div className='w-2/5 '>
            {leftChildren}
        </div>

        <div className='w-3/5'>
            {rightChildren}
        </div>
    </div>
  )
}

export default splitLayout

// used by Landing page and Trip page