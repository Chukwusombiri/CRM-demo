import React from 'react'

export default function PrimaryButton({val, ...props}) {
  return (
    <button {...props} className='px-6 py-2.5 rounded-2xl bg-cyan-600 border-cyan-600 hover:bg-cyan-800 hover:border-cyan-800 text-gray-50 text-xs uppercase font-bold tracking-wide'>{val}</button>
  )
}
