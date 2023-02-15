import React from 'react'

const Loader = () => {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
      <div className="h-9 w-9 rounded-full bg-gray-200"></div>
    </div>
  )
}

export default Loader