import React, { useState } from 'react'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { categorias, colores, talla, material } from '../utils/databooty'
import { useLocation } from "react-router-dom";
import { useMemo } from 'react';
import { getAllProductsItems } from '../utils/firebaseFunctions';
import { RiFilter2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { AiFillFire, AiOutlineBgColors } from 'react-icons/ai'

const FiltrosHome = () => {
    const [filtros, setFiltro] = React.useState("new")
    const [{ products }, dispatch] = useStateValue();
    const [products2, setProducts2] = useState("")
    const { pathname } = useLocation();
    const titleRef = React.useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [colores2, setColores] = useState([])
    const [colores, setColores2] = useState([])
    const [filtrocolorselect, setFiltroColor] = React.useState('')



    const colorselect = (color) => {
        if (color === 'Negro') {
            return 'bg-black'
        }
        if (color === 'Morado') {
            return 'bg-[#c7acbf]'
        }
        if (color === 'Verde') {
            return 'bg-green-100'
        }
        if (color === 'Gris') {
            return 'bg-gray-400'
        }
        if (color === 'Purple') {
            return 'bg-[#9c78a8]'
        }
        if (color === 'Blue') {
            return 'bg-blue-500'
        }
        if (color === 'Rosado') {
            return 'bg-[#da9bc1]'
        }
        if (color === 'Purpura') {
            return 'bg-[#977baf]'
        }
        if (color === 'Camuflado') {
            return 'bg-[#acbeaf]'
        }
        if (color === 'Turquesa') {
            return 'bg-[#60ceb9]'
        }
        if (color === 'Verde-Fluor') {
            return 'bg-[#d4e693]'
        }


    }
    const borderselect = (color) => {
        if (color === 'Negro') {
            return 'border-black'
        }
        if (color === 'Morado') {
            return 'border-[#c7acbf]'
        }
        if (color === 'Verde') {
            return 'border-green-100'
        }
        if (color === 'Gris') {
            return 'border-gray-400'
        }
        if (color === 'Purple') {
            return 'border-[#9c78a8]'
        }
        if (color === 'Blue') {
            return 'border-blue-500'
        }
        if (color === 'Rosado') {
            return 'border-[#da9bc1]'
        }
        if (color === 'Purpura') {
            return 'border-[#977baf]'
        }
        if (color === 'Camuflado') {
            return 'border-[#acbeaf]'
        }
        if (color === 'Turquesa') {
            return 'border-[#60ceb9]'
        }
        if (color === 'Verde-Fluor') {
            return 'border-[#d4e693]'
        }
    }

    const variants = {
        open: { width: '100%', height: 400, opacity: 1 },
        closed: { width: 0, height: 0, fontSize: '2px', opacity: 0 },
    }
    const variants2 = {
        open: { width: 300, height: 400, opacity: 1 },
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


    const filtrarcolor = (b) => {
        console.log(b)
        /*         console.log(products2.filter(a => a.color[0].name === b))
         */
        let array = []

        console.log(products2.filter(a => {
            for (let i = 0; i < a.color.length; i++)
                if (a.color[i].name === b) {
                    array.push({
                        caracteristicas: a.caracteristicas,
                        categoria: a.categoria,
                        color: [a.color[i]],
                        id: a.id,
                        oferta: a.oferta,
                        precio: a.precio,
                        name: a.name,
                    }

                    )
                }
        }

        ))

        console.log(array)


        dispatch({
            type: actionType.SET_PRODUCTS,
            products: array,
        });




    }

    const categoria = (b) => {
        console.log(products2.filter(a => Number(a.oferta) === 0))
        if (b === 'ofertas') {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: products2.filter(a => Number(a.oferta) !== 0),
            });
        }
        else if (b === 'new') {
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
                            colores.map((a, index) =>
                                <div key={index} onClick={() => setFiltroColor(a)} className={` ${filtrocolorselect === a ? `border-2
                                ${borderselect(a.name)} rounded-full` : 'border-2 border-white rounded-full flex gap-2 '} `}>
                                    <div className={` ${colorselect(a)} h-4 w-4 rounded-full border-2`}></div>
                                    <p>{a}</p>
                                </div>

                            )


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

                <ul ref={titleRef} className='flex overflow-x-auto gap-2 cursor-pointer h-[50px]  '>
                    {
                        categorias.map((a, index) =>
                            <motion.li
                                whileTap={{ scale: 0.3 }}
                                key={index} onClick={() => categoria(a.param)} className={` ${filtros === a.param ? 'text-white bg-booty font-bold border-white border-2' : 'text-black'} : flex rounded-lg opacity-70  text-gray-400 text-[0.8rem] items-center p-4 cursor-pointer hover:border-2 bg-gray-100   hover:border-gray-200  border-2 border-white transition-all ease-in-out 2s`} >
                                <p>{a.name}</p>
                            </motion.li>
                        )
                    }
                </ul>
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
                                colores.map((a, index) =>
                                    <div key={index} onClick={() => setFiltroColor(a)} className={` ${filtrocolorselect === a ? `border-2
                                ${borderselect(a.name)} rounded-full` : 'border-2 border-white rounded-full'} `}>
                                        <div className={` ${colorselect(a)} h-4 w-4 rounded-full border-2`}></div>
                                    </div>

                                )


                            }

                        </ul>



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