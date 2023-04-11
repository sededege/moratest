import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import Carrousel from './Carousel'
import { AnimatePresence, motion } from 'framer-motion'

const Products = ({ productos }) => {
  const [{ products }] = useStateValue()
  

  return (
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 gap-5'>
            {
                productos && productos.length > 0 && (
                  // eslint-disable-next-line react/prop-types
                 productos.map((a, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index / 10 }}

                            key={index} className='h-full relative '>
                            <div className='gap-2 flex flex-col mb-5'>
                                <div>
                                    <AnimatePresence>
                                        <motion.div
                                            key={a.id}
                                            whileHover={{
                                              scale: 1.05,
                                              transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Carrousel imagenes={a.color} id={a.id} />
                                        </motion.div>
                                    </AnimatePresence>

                                </div>
                                <div className='p-2 rounded-b-lg relative '>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{a.name} {a.color[0].name}</p>
                                        {
                                            a.oferta !== '0' && <p className='md:hidden flex text-[12px] md:text-[14px] w-full font-bold bg-booty px-2 rounded-lg text-white'>{a.oferta} % OFF</p>

                                        }
                                    </div>

                                    <div className='flex h-full justify-between  items-center '>
                                        {
                                            a.oferta !== '0'
                                              ? <div className='flex gap-2 items-center'>
                                                <p className='text-[1.4rem] md:text-[1.2rem] text-black font-semibold'>$ {Math.round((a.precio * (100 - (a.oferta))) / 100)}</p>
                                                <p className='text-[1rem] text-gray-400 line-through'>$ {a.precio}</p>

                                            </div>
                                              : <p className='text-[1.2rem] font-semibold text-black'>$ {a.precio}</p>

                                        }
                                        {
                                            a.oferta !== '0' && <p className='md:flex hidden text-[12px] md:text-[14px] font-bold bg-booty px-2 rounded-lg  text-white'>{a.oferta} % OFF</p>

                                        }
                                               </div>

                                </div>
                            </div>
                        </motion.div>
                  )))

            }
        </div>

  )
}

export default Products
