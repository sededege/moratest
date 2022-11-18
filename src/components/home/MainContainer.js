import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import Products from './Products'
import { actionType } from '.././context/reducer'
import Banner from '../img/banner.jpg'
import FiltrosHome from './FiltrosHome'
import Footer from './Footer'
import { AnimatePresence, motion } from 'framer-motion'
import CarrouselHome from './Carouselhome'

const MainContainer = () => {
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
 */}                <CarrouselHome />
                <FiltrosHome />
                <AnimatePresence>
                    <motion.div>
                        <Products className='flex' />
                    </motion.div>
                </AnimatePresence>
                {/*                 <Footer />
 */}            </div>

        </div>
    )
}

export default MainContainer