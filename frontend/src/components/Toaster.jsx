import React, { useEffect, useState } from 'react'
import { isEmpty } from '../axios.client';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Toaster() {
    const [toast, setToast] = useState({});
    const isError = toast.type == 'error' || false
    useEffect(() => {
        const handler = (evt) => {           
            setToast({
                type: evt.detail.type,
                message: evt.detail.message,
                duration: evt.detail.duration || 3000,
            });
        };

        window.addEventListener('notify', handler);
        return () => window.removeEventListener('notify', handler);
    }, []);

    useEffect(() => {
        if (isEmpty(toast)) return;

        setTimeout(() => {
            setToast({});
        }, toast.duration)
    }, [toast])

    if (isEmpty(toast)) {
        return null;
    }
    return (
        <div className={`fixed top-2 right-2 w-[90%] max-w-sm md:w-56 md:right-4 z-50 p-2 flex gap-1 items-center rounded-md shadow-md ${isError ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
            <span className='text-sm break-words mr-auto'>{toast.message}</span>
            <button className='outline-none border-none' onClick={() => setToast({})}>
                <IoIosCloseCircleOutline />
            </button>
        </div>

    )
}
