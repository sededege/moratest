import React, { useState } from 'react'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { categorias, colores, talla, material } from '../utils/databooty'
import { useLocation } from "react-router-dom";

const FiltrosHome = () => {
    const [filtros, setFiltro] = React.useState("new")
    const [{ products }, dispatch] = useStateValue();
    const [products2, setProducts2] = useState([])

    React.useEffect(() => {
        setProducts2(products)
/*         console.log(products)
 */    }, [products2])
    const { pathname } = useLocation();
    const titleRef = React.useRef()

    const categoria = (b) => {
        if (products2 != "") {
            if (b === 'new') {
                console.log('asd')
                dispatch({
                    type: actionType.SET_PRODUCTS,
                    products: products2.sort((a, c) => a.id < c.id),
                });
            } else {
                dispatch({
                    type: actionType.SET_PRODUCTS,
                    products: b != 'todas' ? products2.filter(a => a.categoria === b) : products2,
                });
            }

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
        <div ref={titleRef} className='flex gap-4 '>
            {
                categorias.map((a, index) =>
                    <p key={index} onClick={() => categoria(a.param)} className={` ${filtros === a.param ? 'text-white bg-booty' : 'text-gray-400 cursor-pointer hover:border-2 hover:border-gray-200 box-border border-2 border-white'} : flex font-bold  rounded-lg w-[100px] opacity-70 items-center justify-center p-2 transition-all ease-in-out 2s`} >{a.name}</p>
                )
            }
        </div>
    )
}

export default FiltrosHome