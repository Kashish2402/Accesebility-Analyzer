import { Loader2Icon } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className='h-screen w-screen bg-[#121212] flex items-center justify-center'>
      <div>
        <Loader2Icon/>
        <h1>We are analyzinf your website</h1>
      </div>
    </div>
  )
}

export default Loading
