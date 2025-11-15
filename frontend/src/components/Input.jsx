import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {    
    return (        
            <input ref={ref} {...props} className='w-full rounded-xl px-4 py-2 border border-gray-200 text-md bg-gray-50 text-gray-700 focus:border-gray-300 placeholder:text-gray-500' />        
    )
})

export default Input