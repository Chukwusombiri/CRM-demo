import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function () {
    const error = useRouteError()
    return (
        <div className='h-[100vh] flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-semibold text-center text-rose-600'>Oops! Something went wrong</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                {error.status} - <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}
