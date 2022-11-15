import React, { useState } from 'react'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { categorias, colores, talla, material } from '../utils/databooty'
import { useLocation } from "react-router-dom";
import { useMemo } from 'react';
import { getAllProductsItems } from '../utils/firebaseFunctions';

const FiltrosHome = () => {
    const [filtros, setFiltro] = React.useState("new")
    const [{ products }, dispatch] = useStateValue();
    const [products2, setProducts2] = useState("")
    const { pathname } = useLocation();
    const titleRef = React.useRef()

   

    React.useEffect(() => {

       getAllProductsItems().then((data) => {
            setProducts2(data)
        }) 

        console.log(products2)
    }, [])


    const categoria = (b) => {
        console.log(products)
       
        if (b === 'new') {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: products2.sort(() => Math.random() - 0.5),
            });

        } else {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: null,
            });   
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

        <div >
            <ul ref={titleRef} className='flex overflow-auto gap-5 cursor-pointer h-[70px] py-2'>
                {
                    categorias.map((a, index) =>
                        <li key={index} onClick={() => categoria(a.param)} className={` ${filtros === a.param ? 'text-white bg-booty' : 'text-gray-400 cursor-pointer hover:border-2 bg-gray-100 hover:border-gray-200 box-border border-2 border-white'} : flex font-bold  rounded-lg w-[140px] opacity-70 items-center justify-center p-2 transition-all ease-in-out 2s`} >{a.name}</li>
                    )
                }
            </ul>
        </div>

    )
}

export default FiltrosHome