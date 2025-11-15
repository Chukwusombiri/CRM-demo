import React from 'react'

export default function DatalistLoading() {
  return (
    <div className='w-full py-4'>
        <h4 className="animate-pulse bg-gray-200 rounded w-56 text-gray-200">title</h4>
        <ul className="mt-6 list-outside space-y-4" role='listbox'>
        {
          Array(7).fill('loading').map((el,idx) => <li key={idx} className='w-full grid grid-cols-7 items-center gap-3'>
              <span className='col-span-3 bg-gray-200 rounded-lg animate-pulse text-gray-200 py-4'>{el}</span>
              <span className='col-span-2 bg-gray-200 rounded-lg animate-pulse text-gray-200 py-4'>{el}</span>
              <span className='col-span-2 bg-gray-200 rounded-lg animate-pulse text-gray-200 py-4'>{el}</span>
            </li>)
        }
        </ul>        
    </div>
  )
}
