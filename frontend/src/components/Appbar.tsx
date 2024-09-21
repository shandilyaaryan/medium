import React from 'react'
import Avatar from './Avatar'

const Appbar = () => {
  return (
    <>
    <div className='border-b flex justify-between px-20 py-4'>
        <div className='text-xl font-bold'>
            Aryan
        </div>
        <div className='cursor-pointer '>
            <Avatar name='Aryan' />
        </div>
    </div>
    </>
  )
}

export default Appbar