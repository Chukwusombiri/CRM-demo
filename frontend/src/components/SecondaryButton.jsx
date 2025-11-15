import React from 'react'

export default function SecondaryButton({val, ...props}) {
  return (
    <button {...props} className='px-6 py-2.5 rounded-2xl bg-gray-800 border-gray-800 hover:bg-gray-900 hover:border-gray-900 text-gray-50 text-xs uppercase font-bold tracking-wide'>{val}</button>
  )
}
