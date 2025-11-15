import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient, { isEmpty } from '../axios.client';
import FormLoading from '../components/FormLoading';
import H3 from '../components/H3';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();    
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [vaErrors, setVaErrors] = useState({});

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        axiosClient.get(`/users/${id}`)
            .then(resp => {
                const { data } = resp;
                setIsLoading(false);
                setUser(prev => ({...data}));
            }).catch(err => {
                setIsLoading(false);                
                console.error(err);
            })
    }, [])

    const handleUpdateUser = () => {
        axiosClient.put(`/users/${user.id}`, user)
            .then(() => {                
                setIsLoading(false);                
                navigate('/users');
                window.dispatchEvent(new CustomEvent('notify',{
                    detail: {
                        type: 'success',
                        message: 'User account was updated.'
                    }
                }))
            }).catch(err => {
                setIsLoading(false);
                const { response } = err;
                if (!response) return console.error(err);

                if (response.status == 422) {
                    const { errors } = response.data;
                    setVaErrors(errors);
                    return;
                }

                console.error(err);
            })
    }

    const handleCreateUser = () => {    
        axiosClient.post(`/users`,user)
            .then(() => {                
                setIsLoading(false);
                const evnt = new CustomEvent('notify',{
                    detail: {
                        type: 'success',
                        message: 'You\'ve created a new user.'
                    }
                })
                window.dispatchEvent(evnt);
                navigate('/users');
            }).catch(err => {
                setIsLoading(false);
                const { response } = err;
                if (!response) return console.error(err);

                if (response.status == 422) {
                    const { errors } = response.data;
                    setVaErrors(errors);
                    return;
                }

                console.error(err);
            })
    }

    if (isLoading) {
        return <FormLoading />
    }
    return (
        <div className='flex justify-center sm:pt-16 lg:pt-0 lg:items-center'>
            <AuthCard>
                <H3 content={user.id ? 'Update User: '+user.name : 'Create New User'} className='capitalize text-center' />
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    user.id ? handleUpdateUser() : handleCreateUser();
                }}>
                    <div className='space-y-4 mt-6'>
                        <Input type="text" placeholder="Enter full name" name="name" value={user.name} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        {
                            !isEmpty(vaErrors) && <p className="text-red-600 text-sm mt-1">{vaErrors?.name}</p>
                        }
                        <Input type="email" placeholder="Enter email" name="email" value={user.email} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        {
                            !isEmpty(vaErrors) && <p className="text-red-600 text-sm mt-1">{vaErrors?.email}</p>
                        }
                        <Input type="password" placeholder="Enter password" name="password" value={user.password} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        {
                            !isEmpty(vaErrors) && <p className="text-red-600 text-sm mt-1">{vaErrors?.password}</p>
                        }
                        <Input type="password" placeholder="Repeat Password" name="password_confirmation" value={user.password_confirmation} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="mt-4 flex justify-center">
                        <PrimaryButton type="submit" val={user.id ? 'update user' : 'create user'} />
                    </div>
                </form>
            </AuthCard>
        </div>
    )
}
