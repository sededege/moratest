import React, { useState } from 'react'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { categorias, colores, talla, material } from '../utils/databooty'
import { useLocation } from "react-router-dom";
import { useMemo } from 'react';
import { getAllProductsItems } from '../utils/firebaseFunctions';
import { RiFilter2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const FiltrosHome = () => {
    const [filtros, setFiltro] = React.useState("new")
    const [{ products }, dispatch] = useStateValue();
    const [products2, setProducts2] = useState("")
    const { pathname } = useLocation();
    const titleRef = React.useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [colores2, setColores] = useState([])
    const [colores, setColores2] = useState([])

    const variants = {
        open: { width: '100%', height: 400, opacity: 1 },
        closed: { width: 0, height: 0, fontSize: '2px', opacity: 0 },
    }
    const variants2 = {
        open: { width: 300, height: 400, opacity: 1  },
        closed: { width: 0, height: 0, opacity: 0 },
    }

    React.useEffect(() => {

        getAllProductsItems().then((data) => {
            setProducts2(data)
        })



        products && (products.map(a =>
            a.color.map(b =>
                colores2.indexOf(b.name) === -1 ? setColores(prev => [...prev, b.name]) : console.log('ya estoy')

            )))

        let result = colores2.reduce((acc, item) => {
            if (!acc.includes(item)) {
                acc.push(item);
            }
            return acc;

        }, [])

        console.log(products2)
        setColores2(result)
    }, [products, colores2])


    const filtrarcolor = (a) => {
        console.log('hola')

        dispatch({
            type: actionType.SET_PRODUCTS,
            products: products2.filter(b => b.colores.indexOf(a) !== -1),
        });




    }

    const categoria = (b) => {
        console.log(products)

        if (b === 'new') {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: products2.sort(() => Math.random() - 0.5),
            });

        } else {
            /*  dispatch({
                 type: actionType.SET_PRODUCTS,
                 products: null,
             }); */
            setTimeout(() => {
                dispatch({
                    type: actionType.SET_PRODUCTS,
                    products: b != 'todas' ? products2.filter(a => a.categoria === b).sort(() => Math.random() - 0.5) : products2.sort(() => Math.random() - 0.5),
                });
            }, 100);



        }

        setFiltro(b)

        var element = titleRef.current;
        var headerOffset = 80;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });


    };
    return (
        <>
            {/*         escritorio
 */}            <div className='md:flex hidden justify-between relative' >
                <h1 className=' items-center flex'>Catalogo</h1>
                <ul ref={titleRef} className='flex overflow-auto gap-2 cursor-pointer h-[50px]  '>
                    {
                        categorias.map((a, index) =>
                            <motion.li
                                whileTap={{ scale: 0.3 }}
                                key={index} onClick={() => categoria(a.param)} className={` ${filtros === a.param ? 'text-white bg-booty text-semibold' : 'text-gray-400 text-[1rem] cursor-pointer hover:border-2 bg-gray-100   hover:border-gray-200 box-border border-2 border-white'} : flex rounded-lg  md:w-[100px] opacity-70 items-center justify-center transition-all ease-in-out 2s`} >{a.name}</motion.li>
                        )
                    }
                </ul>

                <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => setIsOpen(!isOpen)} className='flex gap-2 items-center cursor-pointer bg-gray-100 rounded-md hover:shadow-md   text-gray-400  p-2'>
                    <span>Filtros</span>
                    <RiFilter2Fill />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ ease: "easeIn", duration: 0.4 }}
                    variants={variants2}
                    className='absolute shadow-lg w-[30vw]  rounded-lg items-center p-5 bg-white  mt-[50px] z-20 right-0'>
                    <p>Color</p>
                    <ul>
                        {
                            colores.map(a => <li className='hover:underline' onClick={() => filtrarcolor(a)}>{a}</li>)
                        }

                    </ul>

                    <p>Price</p>

                </motion.div>

            </div >
            {/*     mobile */}
            <div className='flex flex-col md:hidden justify-between relative' >
                <div className='flex items-center justify-between mb-4'>
                    <h1 className=' items-center flex'>Catalogo</h1>
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        onClick={() => setIsOpen(!isOpen)} className='flex gap-2 items-center cursor-pointer bg-gray-100 rounded-md hover:shadow-md   text-gray-400  p-2'>
                        <span>Filtros</span>
                        <RiFilter2Fill />
                    </motion.div>
                </div>


                {

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isOpen ? "open" : "closed"}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeIn", duration: 0.2 }}
                        variants={variants}
                        className='absolute shadow-lg w-0 rounded-lg items-center p-5 bg-white h-[40vh] mt-[50px] z-20 right-0'>
                        <p className='font-bold'>Color</p>
                        <ul>
                            {
                                colores.map(a => <li className='hover:underline' onClick={() => filtrarcolor(a)}>{a}</li>)
                            }

                        </ul>

                        <p className='font-bold'>Price</p>


                    </motion.div>

                }


            </div >
        </>
    )
}

export default FiltrosHome



{/* <motion.div
whileTap={{ scale: 0.75 }}
onClick={() => setIsOpen(!isOpen)} className='md:hidden flex gap-2 items-center cursor-pointer bg-white rounded-lg shadow-lg p-4 hover:shadow-md   text-gray-400  '>
<RiFilter2Fill />
</motion.div>
 */}