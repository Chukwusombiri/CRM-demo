import React from 'react'

export default function H3({content, className=''}) {
  const classes = 'text-gray-600 text-xl font-semibold lg:text-2xl tracking-wide mb-2' + className;
  return (
    <h3 className={classes}>{content}</h3>
  )
}
