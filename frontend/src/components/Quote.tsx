import React from 'react'

const Quote = () => {
  return (
    <div className='bg-slate-100 h-screen flex flex-col justify-center'>
        <div className='flex justify-center'>
            <div className='max-w-lg'>
                <div className='text-3xl font-bold'>
            "The customer service i recieved was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className='mt-4 max-w-md text-xl font-semibold'>
                    Jules Winfield
                </div>
                <div className='mt-1 max-w-md text-sm font-normal text-slate-500'>
                    CEO | Acme Corp
                </div>
            </div>
        </div>
    </div>
  )
}

export default Quote