import React from 'react'

function Loading() {
  return (
    <div className='h-screen w-screen bg-[#121212] flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img src="./Loader.gif" alt="Loader" />
        <h1>We are analyzing your website</h1>
      </div>
    </div>
  )
}

export default Loading
