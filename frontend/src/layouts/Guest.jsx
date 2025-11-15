import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/ContextProvider';

export default function Guest() {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to={'/users'} />
  }

  return (
    <div className='min-h-screen lg:h-screen bg-slate-900 antialiased flex justify-center md:items-center'>
      <div className="px-6 pt-20 md:pt-0">
        <Outlet />
      </div>
    </div>
  )
}
