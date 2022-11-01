import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsInfoCircleFill } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'
import { FiShoppingCart } from "react-icons/fi";
import { FiHeart } from 'react-icons/fi';
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Carrousel from './Carousel'

const Products = () => {
    const [{ products }, dispatch] = useStateValue()
    const history = useNavigate();

/*     console.log(products)
 */    return (
        <div className=' grid grid-cols-2 md:grid-cols-5  gap-10 mb-10'>
            {
                products && products.length > 0 ?
                    products.map(a => (
                        <div key={a.id} className='h-full relative '>
                            <div className='gap-2 flex flex-col mb-5'>
                                <div>
                                    <Carrousel imagenes={a.color} id={a.id} />
                                </div>
                             
                                <div className='p-2 rounded-b-lg relative'>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{a.name}</p>
                                    </div>
                                    <div className='flex mt-2 h-full justify-between  items-center '>
                                        <p className='font-bold text-[1.2rem] text-black'>$ {a.precio}</p>
                                        {/*                                         <MdArrowForwardIos className='text-[2rem] text-booty bg-bghome p-2 rounded-full ' />
 */}
                                        <FiShoppingCart className='text-[1.4rem] text-booty  ' />
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                    : <div className='flex w-[60vw] h-[70vh] items-center justify-center'><p>No hay datos con estas caracteristicas</p></div>
            }
        </div>

    )
}

export default Products