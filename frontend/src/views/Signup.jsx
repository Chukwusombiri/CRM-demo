import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/ContextProvider';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import SecondaryButton from '../components/SecondaryButton';
import H3 from '../components/H3';
import axiosClient from '../axios.client';

export default function Signup({}) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [vaErrors, setVaErrors] = useState(null);
  
    const { setUser, setTokenLocal } = useAuthContext();   

    // Handle form submit
    function handleSubmit(evt) {
      evt.preventDefault();

      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
      }

      axiosClient.post('/register',payload)
        .then(({data}) => {
            setTokenLocal(data.token);            
            setUser(data.user);            
        }).catch((err) => {
            console.error(err);
            if(err.response && err.response.status==422){
              const vErrors = err.response.data.errors;
              setVaErrors(vErrors);
            }
        })
    }

  return (
    <div>
      <AuthCard>
        <form action="" onSubmit={handleSubmit} className='min-w-xl'>
          <div className="text-center mb-6">
            <H3 content={'Sign-up today'} />
          </div>
          <div className="space-y-3">
            <Input type="text" ref={nameRef} placeholder="Enter your full name" name="name" />
            {vaErrors?.name && <p className="text-sm text-red-500">{vaErrors.name}</p>}
            <Input type="email" ref={emailRef} placeholder="Enter your email" name="email" />
            {vaErrors?.email && <p className="text-sm text-red-500">{vaErrors.email}</p>}
            <Input type="password" ref={passwordRef} placeholder="Enter your password" name="password" />
            {vaErrors?.password && <p className="text-sm text-red-500">{vaErrors.password}</p>}
            <Input type="password" ref={passwordConfirmationRef} placeholder="Confirm your password" name="confirmPassword" />
          </div>
          <p className="mt-3 text-sm">Already have an account? <Link to={'/login'} className="underline hover:no-underline text-cyan-600">Login</Link></p>
          <div className="my-4 flex justify-center">
            <SecondaryButton type="submit" val="register now" />
          </div>
        </form>
      </AuthCard>
    </div>
  )
}
