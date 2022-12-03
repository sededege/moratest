import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
const Carrousel = (c) => {
    const [{ favoritos }, dispatch] = useStateValue();
    const history = useNavigate();
    const [prueba, setPrueba] = React.useState("")


    React.useEffect(() => {
        if (favoritos) {
            setPrueba(favoritos.map(a => a.favoritos))
        }
    }, [favoritos])


    const navegar = (a) => {
        history(`/detalle/${a}`)

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

    return (
        <Carousel
            showStatus={false}
            showThumbs={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = {
                    marginLeft: 20,
                    backgroundColor: c.imagenes.length > 0 && colores(c.imagenes[index].name) ,
                    cursor: "pointer",
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    marginTop: 5,
                    border: '1px solid white',

                }
                const style = isSelected
                    ? { ...defStyle, border: 'solid 2px white' }
                    : { ...defStyle };

                return (
                    <div
                        style={style}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`${label} ${index + 1}`}
                    >
                                                                        <div className={` ${colores('Negro')} h-4 w-4 rounded-full border-2`}></div>
                    </div>

                );
            }}
        >

            {
                c.imagenes.length > 0 && (c.imagenes.map((a, index) =>
                    <motion.div
                        key={index}
                        className='h-[300px] hover:opacity-70 z-[10] cursor-pointer ' onClick={() => navegar(c.id)}>
                        <img className='rounded-lg w-full h-full object-cover   ' src={a.images[0]} />

                    </motion.div>
                ))
            }



        </Carousel>
    )
}

export default Carrousel