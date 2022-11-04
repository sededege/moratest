import React, { useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useStateValue } from '.././context/StateProvider'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { actionType } from '.././context/reducer'
import Galeria2 from './Galeria2';
import Galeria from './Galeria';

import Comentarios from './Comentarios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import mp from '../../components/img/mp.webp'
import efectivo from '../../components/img/efectivo.png'

let itemsa = [];


const Detalle = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [{ products, cartItems, headerShow }, dispatch] = useStateValue()
    const { productId } = useParams()
    const [thisProduct, setThisProduct] = React.useState([])
    const [cantidad, setCantidad] = React.useState(1)
    const [filtrocolorselect, setFiltroColor] = React.useState('')
    const [selectedsize, setSelectedSize] = React.useState('M')
    const [items, setItems] = useState([]);
    const [toggle, setToggle] = useState('Info')
    const history = useNavigate();

    React.useEffect(() => {
        if (products && products.length > 0) {
            setThisProduct(products.find(prod => String(prod.id) === String(productId)))
        }
        if (items && items.length > 0) {
            addtocart();
        }


        thisProduct != "" ? setFiltroColor(thisProduct.color[0].name) : <></>




        /*         console.log(thisProduct.talles.filter( a => a.name === filtrocolorselect)[0].tallas)
         */

        dispatch({
            type: actionType.SET_DONDE_ESTOY,
            dondeestoy: 'Detalle'
        })




        itemsa = cartItems

    }, [products, items, itemsa, thisProduct])

    const headerOff = () => {
        dispatch({
            type: actionType.SET_HEADER_SHOW,
            headerShow: false,
        });

    }

    const pedido = (item) => {


        const itemselect = [{
            item,
            colorselected: filtrocolorselect,
            size: selectedsize,
            unidades: cantidad,
        }]
        setItems([...cartItems, itemselect])



    }


    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(itemsa));
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: itemsa,
        });
    };

    const addtocart = () => {

        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    const [value, setValue] = React.useState(5);

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
            return 'bg-purple-300'
        }
        if (color === 'Blue') {
            return 'bg-blue-500'
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
            return 'border-purple-300'
        }
        if (color === 'Blue') {
            return 'border-blue-500'
        }
    }

    return (
        <div>
            {/*     escritorio */}

            <div className='fixed'>
                <div className='md:w-[80vw] md:flex hidden w-[100vw] md:ml-[10vw] md:px-20 justify-start mt-[10vh] overflow-hidden'>
                    {/*                 <p className=' font-light w-full ml-3 text-gray-500'>Detalle del producto</p>
 */}                <nav className="flex p-2 ml-4" aria-label="Breadcrumb" >
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <div onClick={() => history(`/Home`)} className="inline-flex items-center text-sm font-regular text-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </div>
                            </li>

                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="ml-1 text-sm font-medium text-booty md:ml-2 ">Detalle de producto</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                </div>
                {
                    thisProduct ?
                        <div className='md:flex hidden  md:w-[80vw] w-[100vw] h-full px-5 md:px-20 md:ml-[11vw]'>
                            <div className='flex '>

                                <Galeria images={thisProduct.color} filtrocolor={filtrocolorselect} />
                                {/*                              <Galeria2 images={thisProduct.img} filtrocolor={filtrocolorselect}/>
 */}                        </div>

                            {/*        <div className='flex items-center gap-4'>
                                <p onClick={() => setToggle('Info')} className={` ${toggle === 'Info' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Informacion</p>
                                <p onClick={() => setToggle('Reviews')} className={` ${toggle === 'Reviews' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Comentarios ({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')})</p>

                            </div> */}


                            {/* <div className='flex gap-4'>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#ffb381"
                                        },
                                        "& .MuiRating-iconHover": {
                                            color: "purple"
                                        }
                                    }}
                                />
                                <p className='font-light text-gray-400'>({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')} reviews)</p>
                            </div> */}
                            <div className=' flex-col md:flex hidden w-full  items-center gap-6'>

                                {
                                    toggle === 'Info' ?
                                        <div className=' md:w-[35vw]  p-5 h-full '>

                                            <div className='flex flex-col gap-6'>
                                                <div className='flex  gap-6'>
                                                    <div className='flex'>
                                                        <p className='font-semibold text-textColor text-[1.3rem]'>{thisProduct.name} </p>

                                                    </div>

                                                    <div className='flex gap-4'>

                                                        <Rating

                                                            name="simple"
                                                            value={5}

                                                            sx={{
                                                                "& .MuiRating-iconFilled": {
                                                                    color: "#ffb381"
                                                                },
                                                                "& .MuiRating-iconHover": {
                                                                    color: "purple"
                                                                }
                                                            }}
                                                        /> <p className='font-light text-gray-400'>(5 reviews)</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-6 mr-10'>
                                                    <p className='font-normal text-[0.9rem] text-gray-400'>{thisProduct.descripcion}</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-6'>

                                                <div className='flex justify-between items-center gap-20 mt-10'>
                                                    <div className=' flex flex-col gap-4'>
                                                        <p className='font-bold text-textColor'>Color</p>
                                                        <div className='flex gap-2 w-full'>
                                                            {
                                                                thisProduct.color && thisProduct.color.map(a =>
                                                                    <div key={a.id} onClick={() => setFiltroColor(a.name)} className={` ${filtrocolorselect === a.name ? `border-2
                                             ${borderselect(a.name)} rounded-full` : 'border-2 border-white rounded-full'} `}>
                                                                        <div className={` ${colorselect(a.name)} h-4 w-4 rounded-full border-2`}></div>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-4'>

                                                        <p className='font-semibold text-textColor'>Talle</p>
                                                        <div className='gap-4 flex'>
                                                            {/*  {
                                                        thisProduct.talles ? thisProduct.talles.map(a => (
                                                            a.stock > 0 ?
                                                                <div onClick={() => setSelectedSize(a.name)} className={` ${selectedsize === a.name ? 'text-white bg-booty' : 'bg-white border-2'}  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}>
                                                                    <p className='cursor-pointer  '>{a.name}</p>
                                                                </div> : <div className='bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center'>
                                                                    <p className='cursor-pointer text-gray-400'>{a.name}</p>
                                                                </div>

                                                        )) : <></>

                                                    } */}
                                                            {
                                                                thisProduct.color && filtrocolorselect ? thisProduct.color.filter(a => a.name === filtrocolorselect)[0].tallas.map(a => (
                                                                    a.stock > 0 ?
                                                                        <div key={a.id} onClick={() => setSelectedSize(a.name)} className={` ${selectedsize === a.name ? 'text-white bg-booty' : 'bg-white border-2'}  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}>
                                                                            <p className='cursor-pointer  '>{a.name}</p>
                                                                        </div> : <div key={a.id} className='bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center'>
                                                                            <p className='cursor-pointer text-gray-400'>{a.name}</p>
                                                                        </div>

                                                                )) : <></>

                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-4 '>
                                                        <p className='font-semibold text-textColor'>Unidades</p>
                                                        <div className='flex  gap-4'>
                                                            <div onClick={cantidad > 1 && (() => setCantidad(cantidad - 1))} className='flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center'>
                                                                <p className='cursor-pointer text-white font-bold'>-</p>
                                                            </div>
                                                            <div className='flex cursor-pointer w-8 h-8 rounded-lg border-2 items-center justify-center'>
                                                                <p className='cursor-pointer'>{cantidad}</p>
                                                            </div>
                                                            <div onClick={() => setCantidad(cantidad + 1)} className='flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center'>
                                                                <p className='text-white font-bold'>+</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='flex flex-col gap-4'>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Características
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'
                                                            }}>
                                                                <p className='font-light text-gray-400'>
                                                                    {thisProduct.caracteristicas}
                                                                </p>
                                                                {/*  <ul className='font-light text-gray-400'>
                                                                
                                                                <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                                <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                                <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                                <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                                <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                                <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                            </ul> */}
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div className='flex flex-col gap-4'>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Comentarios
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div>
                                                                <Comentarios comentarios={thisProduct.comentarios} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div className='flex flex-col gap-4'>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Medios de pago
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div className='flex gap-10 items-center p-4'>
                                                                <img className='w-40 ' src={mp} />
                                                                <img className='w-20 ' src={efectivo} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                {/*  <div className='flex flex-col gap-4 w-full px-10 '>
                                                <p className='font-bold text-textColor'>Caracteristicas</p>
                                                <ul className='font-light text-gray-400'>
                                                    <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                    <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                    <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                    <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                    <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                    <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                </ul>
                                            </div> */}
                                            </div>
                                            <div className='flex items-center  '>

                                                <div className='flex gap-8 mt-10  items-center'>
                                                    <div className=''>
                                                        <p className='text-purple-300 font-bold text-[2rem]'>$ {thisProduct.precio}</p>
                                                    </div>


                                                    <div className=' group  bg-gray-200 hover:bg-gray-400 p-3 items-center justify-center flex cursor-pointer rounded-lg'>
                                                        <button className='text-gray-400 group-hover:text-white'>Añadir a deseados</button>
                                                    </div>
                                                    <div onClick={() => pedido(thisProduct)} className=' group  bg-booty p-3 items-center justify-center flex hover:cursor-pointer rounded-lg hover:bg-white hover:border-booty hover:border-2 '>
                                                        <span className='text-white group-hover:text-booty'>Añadir al carro</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> : <Comentarios comentarios={thisProduct.comentarios} />
                                }

                            </div>


                        </div>

                        : <></>

                }

                {/*           <p className='font-bold'>Reviews</p>
            <Comentarios comentarios={thisProduct.comentarios} /> */}
            </div>

            {/*   mobile */}
            <div className=' md:fixed md:hidden'>
                <div className=' w-[100vw] flex  mt-[10vh] overflow-hidden'>
                    {/*                 <p className=' font-light w-full ml-3 text-gray-500'>Detalle del producto</p>
 */}                <nav className="flex p-2 ml-4" aria-label="Breadcrumb" >
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <div onClick={() => history(`/Home`)} className="inline-flex items-center text-sm font-regular text-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </div>
                            </li>

                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="ml-1 text-sm font-medium text-booty md:ml-2 ">Detalle de producto</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                </div>
                {
                    thisProduct ?
                        <div className='flex flex-col md:hidden  w-[100vw] border-2 h-full px-5 '>
                            <div className='flex '>

                                <Galeria2 images={thisProduct.color} filtrocolor={filtrocolorselect} />
                                {/*                              <Galeria2 images={thisProduct.img} filtrocolor={filtrocolorselect}/>
 */}                        </div>

                            {/*        <div className='flex items-center gap-4'>
                                <p onClick={() => setToggle('Info')} className={` ${toggle === 'Info' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Informacion</p>
                                <p onClick={() => setToggle('Reviews')} className={` ${toggle === 'Reviews' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Comentarios ({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')})</p>

                            </div> */}


                            {/* <div className='flex gap-4'>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#ffb381"
                                        },
                                        "& .MuiRating-iconHover": {
                                            color: "purple"
                                        }
                                    }}
                                />
                                <p className='font-light text-gray-400'>({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')} reviews)</p>
                            </div> */}
                            <div className='flex flex-col  items-center gap-6'>

                                {
                                    toggle === 'Info' ?
                                        <div className=' w-[100vw]  p-5 h-full '>

                                            <div className='flex flex-col gap-6'>
                                                <div className='flex  gap-6'>
                                                    <div className='flex'>
                                                        <p className='font-semibold text-textColor text-[1.3rem]'>{thisProduct.name} </p>

                                                    </div>

                                                    <div className='flex gap-4'>

                                                        <Rating

                                                            name="simple"
                                                            value={5}

                                                            sx={{
                                                                "& .MuiRating-iconFilled": {
                                                                    color: "#ffb381"
                                                                },
                                                                "& .MuiRating-iconHover": {
                                                                    color: "purple"
                                                                }
                                                            }}
                                                        /> <p className='font-light text-gray-400'>(5 reviews)</p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-6 mr-10'>
                                                    <p className='font-normal text-[0.9rem] text-gray-400'>{thisProduct.descripcion}</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-6'>

                                                <div className='flex mt-4 justify-between items-center'>
                                                    <div className=' flex flex-col gap-4'>
                                                        <p className='font-semibold text-textColor '>Color</p>
                                                        <div className='flex gap-4'>
                                                            {
                                                                thisProduct.color && thisProduct.color.map(a =>
                                                                    <div key={a.id} onClick={() => setFiltroColor(a.name)} className={` ${filtrocolorselect === a.name ? `border-2
                                             ${borderselect(a.name)} rounded-full` : 'border-2 border-white rounded-full'} `}>
                                                                        <div className={` ${colorselect(a.name)} h-4 w-4 rounded-full border-2`}></div>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-4 '>

                                                        <p className='font-semibold text-textColor mt-3'>Talle</p>
                                                        <div className='gap-4 flex'>
                                                            {/*  {
                                                        thisProduct.talles ? thisProduct.talles.map(a => (
                                                            a.stock > 0 ?
                                                                <div onClick={() => setSelectedSize(a.name)} className={` ${selectedsize === a.name ? 'text-white bg-booty' : 'bg-white border-2'}  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}>
                                                                    <p className='cursor-pointer  '>{a.name}</p>
                                                                </div> : <div className='bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center'>
                                                                    <p className='cursor-pointer text-gray-400'>{a.name}</p>
                                                                </div>

                                                        )) : <></>

                                                    } */}
                                                            {
                                                                thisProduct.color && filtrocolorselect ? thisProduct.color.filter(a => a.name === filtrocolorselect)[0].tallas.map(a => (
                                                                    a.stock > 0 ?
                                                                        <div key={a.id} onClick={() => setSelectedSize(a.name)} className={` ${selectedsize === a.name ? 'text-white bg-booty' : 'bg-white border-2'}  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}>
                                                                            <p className='cursor-pointer  '>{a.name}</p>
                                                                        </div> : <div key={a.id} className='bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center'>
                                                                            <p className='cursor-pointer text-gray-400'>{a.name}</p>
                                                                        </div>

                                                                )) : <></>

                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-4'>
                                                        <p className='font-semibold text-textColor mt-3'>Unidades</p>
                                                        <div className='flex  gap-4'>
                                                            <div onClick={cantidad > 1 && (() => setCantidad(cantidad - 1))} className='flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center'>
                                                                <p className='cursor-pointer text-white font-bold'>-</p>
                                                            </div>
                                                            <div className='flex cursor-pointer w-8 h-8 rounded-lg border-2 items-center justify-center'>
                                                                <p className='cursor-pointer'>{cantidad}</p>
                                                            </div>
                                                            <div onClick={() => setCantidad(cantidad + 1)} className='flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center'>
                                                                <p className='text-white font-bold'>+</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='flex flex-col gap-4 '>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Características
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'
                                                            }}>
                                                                <p className='font-light text-gray-400'>
                                                                    {thisProduct.caracteristicas}
                                                                </p>
                                                                {/*  <ul className='font-light text-gray-400'>
                                                                
                                                                <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                                <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                                <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                                <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                                <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                                <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                            </ul> */}
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div className='flex flex-col '>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Comentarios
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div>
                                                                <Comentarios comentarios={thisProduct.comentarios} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div className='flex flex-col gap-4'>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Medios de pago
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div className='flex gap-10 items-center p-4'>
                                                                <img className='w-40 ' src={mp} />
                                                                <img className='w-20 ' src={efectivo} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                {/*  <div className='flex flex-col gap-4 w-full px-10 '>
                                                <p className='font-bold text-textColor'>Caracteristicas</p>
                                                <ul className='font-light text-gray-400'>
                                                    <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                    <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                    <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                    <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                    <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                    <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                </ul>
                                            </div> */}
                                            </div>
                                            <div className='flex items-center  '>

                                                <div className='flex gap-8 mt-10  items-center'>
                                                    <div className=''>
                                                        <p className='text-purple-300 font-bold text-[1.5rem] w-[80px]'>$ {thisProduct.precio}</p>
                                                    </div>


                                                    <div className=' group  bg-gray-200 hover:bg-gray-400 p-3 items-center justify-center flex cursor-pointer rounded-lg'>
                                                        <button className='text-gray-400 group-hover:text-white font-semibold'>Añadir a deseados</button>
                                                    </div>
                                                    <div onClick={() => pedido(thisProduct)} className=' group  bg-booty p-3 items-center justify-center flex hover:cursor-pointer rounded-lg hover:bg-white hover:border-booty hover:border-2 '>
                                                        <span className='text-white group-hover:text-booty font-semibold align-center text-center'>Añadir al carro</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> : <Comentarios comentarios={thisProduct.comentarios} />
                                }

                            </div>


                        </div>

                        : <></>

                }

                {/*           <p className='font-bold'>Reviews</p>
            <Comentarios comentarios={thisProduct.comentarios} /> */}
            </div>

        </div>

    )

}

export default Detalle