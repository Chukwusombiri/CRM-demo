import React, { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { isEmpty } from '../axios.client';

export default function ToasterAnimate() {
  const [toast, setToast] = useState({});
  const [show, setShow] = useState(false);
  const isError = toast.type === 'error';

  useEffect(() => {
    const handler = (evt) => {
      const { type, message, duration = 3000 } = evt.detail;
      setToast({ type, message, duration });
      setShow(true);

      setTimeout(() => {
        setShow(false);
        setTimeout(() => setToast({}), 300); // Delay unmount after animation
      }, duration);
    };

    window.addEventListener('notify', handler);
    return () => window.removeEventListener('notify', handler);
  }, []);

  if (isEmpty(toast)) return null;

  return (
    <div
      className={`fixed top-2 right-2 w-[90%] max-w-sm md:w-56 z-50 p-2 flex gap-2 items-center rounded-md shadow-md transition-all duration-300 transform
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${isError ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}
    >
      <span className="text-sm break-words mr-auto">{toast.message}</span>
      <button
        className="outline-none border-none"
        onClick={() => setShow(false)}
      >
        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
}
