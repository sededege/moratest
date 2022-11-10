import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import { databooty } from '../utils/databooty'
import Products from './Products'
import Promos from './Promos'
import { actionType } from '.././context/reducer'
import Loader from '../utils/Loader'
import Feedback from '../cart/Feedback'
import Banner from '../img/banner.jpg'
import FiltrosHome from './FiltrosHome'
import Footer from './Footer'
import { AnimatePresence, motion } from 'framer-motion'

const MainContainer = () => {
    const [{ cartShow, products }, dispatch] = useStateValue();
    const refContainer = React.useRef();
    const [scrollValue, setScrollValue] = React.useState(0)




    React.useEffect(() => {
        dispatch({
            type: actionType.SET_DONDE_ESTOY,
            dondeestoy: 'Home'
        })

        dispatch({
            type: actionType.SET_HEADER_SHOW,
            headerShow: true
        })


    }, [scrollValue, cartShow]);

    return (
        <div className='w-full flex h-screen md:px-20 mt-[10vh] '>

            {/*  <div className='flex justify-between items-center'>
                <div className='w-[100px]'>
                <p className='font-bold text-[1.2rem] md:text-[1.2rem] text-textColor flex gap-6'>Home <span className='hidden md:flex font-light'>Seleccione su producto</span></p>
                </div>
                 <div className='flex bg-white border-2 rounded-full p-2 md:rounded-lg'>
                    <input className='hidden md:flex outline-none px-2' type='text' />
                    <div>
                        <HiSearch className="text-textColor  text-2xl  cursor-pointer" />
                    </div>
                </div>
                 
            </div> */}
            {/*   <div className='flex flex-col h-full'>
                <div className='flex w-full h-[80px]'>
                <p className='font-bold text-[1.2rem] md:text-[1.2rem] text-textColor  gap-4'>Home <span className='hidden md:flex font-light'>Seleccione su producto</span></p>
                </div>
                <div className='flex '>
                    <Filtros />
                </div>
            </div> */}


            <div className='gap-6 flex flex-col w-[100vw] md:w-full md:ml-[12vw] h-[100vh]  px-5 md:px-0'>
                <img src={Banner} className='rounded-lg h-[40vh] object-cover' alt='banner' />
                {/*                         <Promos />
 */}

                <FiltrosHome />
                <AnimatePresence>
                    <motion.div
                

                    >
                        <Products className='flex' />
                    </motion.div>
                </AnimatePresence>
{/*                 <Footer />
 */}            </div>

        </div>
    )
}

export default MainContainer