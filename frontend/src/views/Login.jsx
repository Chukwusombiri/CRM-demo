import React, { useState } from 'react'
import AuthCard from '../components/AuthCard'
import Input from '../components/Input'
import { useAuthContext } from '../context/ContextProvider';
import PrimaryButton from '../components/PrimaryButton';
import H3 from '../components/H3';
import { Link } from 'react-router-dom';
import axiosClient from '../axios.client';

export default function ({ }) {
  const [guest, SetGuest] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [vaError, setVaError] = useState(null);
  const { setUser, setTokenLocal } = useAuthContext();

  const handleChange = (evt) => {
    SetGuest({ ...guest, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      setError(null)
      setVaError(null)
      const response = await axiosClient.post('/login', guest);
      const { data } = response
      setUser(data.user);
      setTokenLocal(data.token);
    } catch (error) {
      const {response} = error
      if (response) {
        const {status} = response;
        const {data} = response;        
        status==422 ? setVaError(data.errors) : setError(data.message);
        return;
      }
      console.error(error);
    }
  }

  return (
    <>
      <AuthCard>
        <form action="" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <H3 content={'Sign-in to your account'} />
          </div>
          {
            error && <p className="text-sm text-red-500 mb-3">{error}</p>
          }
          <div className="space-y-3">
            <Input type="text" placeholder="Enter your email" value={guest.email} name="email" onChange={handleChange} />
            {
              (vaError && vaError.email) && <p className="text-sm text-red-500">{vaError.email}</p>
            }
            <Input type="password" placeholder="Enter your password" value={guest.password} name="password" onChange={handleChange} />
            {
              (vaError && vaError.password) && <p className="text-sm text-red-500">{vaError.password}</p>
            }
          </div>
          <p className="mt-3 text-sm">Not yet registered? <Link to={'/signup'} className="underline hover:no-underline text-cyan-600">Sign-up</Link></p>
          <div className="my-4 flex justify-center">
            <PrimaryButton type="submit" val="Sign-in" />
          </div>
        </form>
      </AuthCard>
    </>
  )
}
