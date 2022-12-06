import React, { useCallback } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useStateValue } from '.././context/StateProvider'
import Carrousel from './Carousel'
import { updateFavoritos } from '../utils/firebaseFunctions';
import { AnimatePresence, m, motion } from 'framer-motion';
import { actionType } from '../context/reducer';

const Products = () => {
    const [{ products, favorite }, dispatch] = useStateValue()
    const [prueba, setPrueba] = React.useState("")

    React.useEffect(() => {
        if (favorite && prueba === '') {

            setPrueba(favorite.map(a => a.favoritos))

        }
        if (prueba && favorite) {

            const data = {
                id: favorite[0].id,
                favoritosadd: prueba[0]
            }

            updateFavoritos(data)

        }

    }, [products, prueba])







    const agregar = (a) => {
        if (prueba[0].indexOf(a) !== -1) {
            console.log('toy')
            const eliminar = prueba[0].filter(b => b !== a)
            setPrueba([eliminar])


        } else {
            const aber = prueba[0]
            aber.push(a)
            setPrueba([aber])
        }

        return console.log(prueba[0])

    }

/*     console.log(products)
 */    return (
        <div className=' grid grid-cols-2 md:grid-cols-5  gap-5 mb-10'>
            {
                products && products.length > 0 && (
                    products.map((a, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index / 10 }}

                            key={a.id} className='h-full relative '>
                            <div className='gap-2 flex flex-col mb-5'>
                                <div>
                                    <AnimatePresence>
                                        <motion.div
                                            key={a.id}
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.3 },
                                            }}
                                        >
                                            <Carrousel imagenes={a.color} id={a.id} />
                                        </motion.div>
                                    </AnimatePresence>

                                </div>

                                <div className='p-2 rounded-b-lg relative '>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{a.name}</p>
                                        {
                                            a.oferta != 0 && <p className='md:hidden flex text-[12px] md:text-[14px] w-full font-bold bg-booty px-2 rounded-lg text-white'>{a.oferta} % OFF</p>

                                        }
                              
                                        {/*   {

                                            prueba && prueba[0].indexOf(a.id) !== -1 ? <AiFillHeart onClick={() => agregar(a.id)} className='text-[3rem] text-red-300 ' /> : <AiOutlineHeart onClick={() => agregar(a.id)} className='text-[3rem] text-red-300 ' />

                                        } */}
                                    </div>


                                    <div className='flex h-full justify-between  items-center '>
                                        {
                                            a.oferta != 0 ? <div className='flex gap-2 items-center'>
                                                <p className='text-[1.4rem] md:text-[1.2rem] text-black'>$ {Math.round((a.precio * (100 - (a.oferta))) / 100)}</p>
                                                <p className='text-[1rem] text-gray-400 line-through		'>$ {a.precio}</p>

                                            </div>
                                                : <p className='text-[1.2rem] text-black'>$ {a.precio}</p>

                                        }
                                        {/*                                         <MdArrowForwardIos className='text-[2rem] text-booty bg-bghome p-2 rounded-full ' />
 */}

                                        {/*   {

                                            prueba && prueba[0].indexOf(a.id) !== -1 ? <AiFillHeart onClick={() => agregar(a.id)} className='text-[25px] text-booty ' /> : <AiOutlineHeart onClick={() => agregar(a.id)} className='text-[25px] text-booty' />

                                        } */}
                                        {
                                            a.oferta != 0 && <p className='md:flex hidden text-[12px] md:text-[14px] font-bold bg-booty px-2 rounded-lg  text-white'>{a.oferta} % OFF</p>

                                        }
                                        {/*                                         <FiShoppingCart className='text-[1.4rem] text-booty  ' />
 */}                                    </div>
                                   
                                   
                                </div>
                            </div>
                        </motion.div>
                    )))

            }
        </div>

    )
}

export default Products