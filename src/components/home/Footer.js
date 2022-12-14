import React from 'react'
import { RiInstagramLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <div className='fixed h-[50px] items-center flex justify-between border-red-100 bottom-0 w-full z-50 bg-white px-5 md:px-20'>
      <div className='hidden md:flex'>
        <p></p>
      </div>
      <div className='flex'>
        <p className='md:ml-20 text-gray-300 text-[0.8rem]'>
          *** Envío gratis en compras mayores a $3000! ***
        </p>
      </div>
      <div className='flex gap-2 items-center'>
        <p className='text-gray-300 md:flex hidden'>Seguinos en</p>
        <a href='https://www.instagram.com/morafit.uy/'>
          <RiInstagramLine className='text-[24px] text-booty' />
        </a>
      </div>
    </div>
  )
}

export default Footer