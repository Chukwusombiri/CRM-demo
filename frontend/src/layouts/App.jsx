import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/ContextProvider'
import SecondaryButton from '../components/SecondaryButton'
import axiosClient, { getFirstName } from '../axios.client';
import { useEffect, useLayoutEffect } from 'react';
import Toaster from '../components/Toaster';

function App() {
  const { token, user, setUser, setTokenLocal } = useAuthContext();
  const firstName = getFirstName(user?.name || '');

  /* fetch authenticated user */
  useLayoutEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => setUser(data))
      .catch(err => {
        setTokenLocal();
        console.error(err);
      })
  }, []);

  /* logout */
  const handleLogOut = (evt) => {
    axiosClient.post('/logout')
      .then(() => {
        setTokenLocal();
        setUser({});
      }).catch(err => console.error(err))
  }

  /* redirect if unauthenticated */
  if (!token) {
    return <Navigate to={'/login'} onClick={() => <Navigate to={'/users/create'} />} />
  }

  return (
    <>
      <Toaster />
      <div className='h-screen flex flex-nowrap bg-gray-900'>
        <aside className="bg-cyan-700 w-[20%] overflow-auto flex flex-col pl-6 pr-2 pt-8 pb-10 space-y-2">
          <Link to={'/dashboard'} className='text-gray-50 font-semibold uppercase text-sm hover:bg-cyan-800 p-2'>Dashboard</Link>
          <Link to={'/users'} className='text-gray-50 font-semibold uppercase text-sm hover:bg-cyan-800 p-2'>Users</Link>
        </aside>
        <div className='w-[80%] overflow-auto relative'>
          <header className='w-full sticky top-0 flex justify-between flex-nowrap items-center bg-white shadow px-6 py-4'>
            <div className='text-gray-700'>Header</div>
            <div className='text-gray-700 flex gap-2 items-center'>
              {
                firstName !== ''
                  ? <span>{firstName}</span>
                  : <span className='animate-pulse bg-gray-300 rounded w-20 text-gray-300'>user</span>
              }
              <SecondaryButton val={'sign-out'} onClick={handleLogOut} />
            </div>
          </header>
          <main className='bg-gray-50 px-6 min-h-screen pb-32 pt-10'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
