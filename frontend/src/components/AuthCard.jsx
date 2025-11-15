import React from 'react'

function AuthCard({children}) {
  return (
    <div className='bg-gray-100 rounded-xl w-full max-w-xl mx-auto px-6 py-4 shadow'>
        {children}
    </div>
  )
}

export default AuthCard