import React from 'react'

export default function FormLoading() {
    return (
        <div className='flex justify-center sm:pt-16 lg:pt-0 lg:items-center'>
            <div role="status" className="w-full max-w-xl p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                {
                    Array(4).fill("loading").map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                    ))
                }
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
