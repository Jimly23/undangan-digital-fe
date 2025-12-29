import React from 'react'
import { IoWarning } from 'react-icons/io5'

const NotFound = () => {
  return (
    <div className="overflow-hidden h-screen w-full flex items-center justify-center rubik-font bg-slate-200">
      <div className="fixed z-40 flex justify-center items-center top-0 left-0 right-0 h-screen bg-black bg-opacity-50">
        <button className="text-white glassmorphism py-2 pb-4 px-4 rounded-lg rubik-font text-sm">
          <IoWarning size={50} className='mx-auto mb-3' />
          Undangan tidak ada
        </button>
      </div>
    </div>
  )
}

export default NotFound