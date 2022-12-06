import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import Products from './Products'
import { actionType } from '.././context/reducer'
import Banner from '../img/banner.jpg'
import FiltrosHome from './FiltrosHome'
import Footer from './Footer'
import { AnimatePresence, motion } from 'framer-motion'
import CarrouselHome from './Carouselhome'
import { BsWhatsapp } from 'react-icons/bs'
import { useNavigate } from 'react-router'

const MainContainer = () => {
    const history = useNavigate()
    const [{ cartShow }, dispatch] = useStateValue();
    const [scrollValue] = React.useState(0)

    React.useEffect(() => {
        dispatch({
            type: actionType.SET_DONDE_ESTOY,
            dondeestoy: 'Home'
        })
        dispatch({
            type: actionType.SET_HEADER_SHOW,
            headerShow: true
        })


    }, [scrollValue, cartShow, dispatch]);

    return (
        <div className='w-full flex h-screen md:px-20 mt-[10vh] '>
            <div className='gap-6 flex flex-col w-[100vw] md:w-full  h-[100vh]  px-5 md:px-0'>
                {/*                 <img src={Banner} className='rounded-lg h-[40vh] object-cover' alt='banner' />
 */}
                <a href='https://wa.me/+59898626100?text=Buenas,%20queria%20consultarte%20lo%20siguiente:' className='hidden md:flex'>
                    <div className='fixed bottom-20 right-20 z-[100] text-green-400 bg-white rounded-full flex items-center gap-2 p-2 shadow-md' >
                        <BsWhatsapp className='w-6 h-6 ' />
                        <p>Whatsapp</p>
                    </div>
                </a>
                <a href='https://wa.me/+59898626100?text=Buenas,%20queria%20consultarte%20lo%20siguiente:' className='flex md:hidden'>
                    <div className='fixed bottom-14 right-5 z-[100] text-green-400 bg-white rounded-full flex items-center gap-2 p-2 ' >
                        <BsWhatsapp className='w-5 h-5 ' />
                        <p>Whatsapp</p>

                    </div>
                </a>
                <CarrouselHome />
                <FiltrosHome />
                <AnimatePresence>
                    <motion.div>
                        <Products className='flex' />
                    </motion.div>
                </AnimatePresence>
                {/*                 <Footer />
 */}            </div >

        </div >
    )
}

export default MainContainer