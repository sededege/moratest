import React from 'react'
import { RiInstagramLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <div className='fixed h-[50px] items-center flex justify-between border-red-100 bottom-0 w-full z-50 bg-white px-20'>
      <div className='flex'>
        <p></p>
      </div>
      <div className='flex'>
        <p className='text-[16px] text-gray-300'>Todos los derechos reservados © Morafit 2022 </p>
      </div>
      <div className='flex gap-2'>
        <p className='text-gray-300'>Seguinos en</p>
        <a href='https://www.instagram.com/morafit.uy/'>
         <RiInstagramLine className='text-[24px] text-booty' />
        </a>
      </div>
    </div>
  )
}

export default Footer