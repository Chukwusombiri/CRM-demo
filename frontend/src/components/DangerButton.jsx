import React from 'react'

export default function DangerButton({val, ...props}) {
  return (
    <button {...props} className='px-6 py-2.5 rounded-2xl bg-red-600 border-red-600 hover:bg-red-800 hover:border-red-800 text-gray-50 text-xs uppercase font-bold tracking-wide'>{val}</button>
  )
}
