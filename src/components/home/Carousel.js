import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
import { HiCubeTransparent } from 'react-icons/hi';
import e from 'cors';
const Carrousel = (c) => {
    const [{ favoritos }, dispatch] = useStateValue();
    const history = useNavigate();
    const [prueba, setPrueba] = React.useState("")


    React.useEffect(() => {
        if (favoritos) {
            setPrueba(favoritos.map(a => a.favoritos))
        }
    }, [favoritos])


    const navegar = (a,index) => {
       history(`/detalle/${a}`,{state: index});
    }
    
    const colores = (color) => {
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
        if (color === 'Azul-Oscuro') {
            return 'bg-blue-900'
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
        console.log(color)
        if (color === 'NegroNegro') {
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
        if (color === 'BlueBlue') {
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
        if (color === 'Celeste') {
            return 'border-[#52a1da]'
        }
    }


    

    return (
        <Carousel
            showStatus={false}
            showThumbs={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                const handleChange = (a) => {
                    onClickHandler()
                    console.log(a)
                      };
                return (
                    <>
                        {
                            index + 1 > 0 &&
                            <div
                                onClick={handleChange}
                                onKeyDown={onClickHandler}
                                value={index}
                                onChange={handleChange}
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-label={`${label} ${index + 1}`}
                                className={`ml-4 mt-2 ${isSelected ? `border-2 border-white ` : `border-gray-400 border-1`} ${colores(c.imagenes[index].name)}  h-4 w-4 rounded-full border-1`}>


                            </div>
                        }



                    </>

                );
            }}
        >
            {/*             ${borderselect(c.imagenes[index].name)}
 */}
            {
                c.imagenes.length > 0 && (c.imagenes.map((a, index) =>
                    <motion.div
                        key={index}
                        className='h-[300px] hover:opacity-70 z-[10] cursor-pointer ' onClick={() => navegar(c.id, c.imagenes[index].name)}>
                        <img className='rounded-lg w-full h-full object-cover   ' src={a.images[0]} />

                    </motion.div>
                ))
            }



        </Carousel >
    )
}

export default Carrousel