import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useStateValue } from '../context/StateProvider';
import { Favorite } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';

const Carrousel = (c) => {
    const [{ favoritos }, dispatch] = useStateValue();
    const history = useNavigate();
    const [prueba, setPrueba] = React.useState("")


    React.useEffect(() => {
        if (favoritos) {
            setPrueba(favoritos.map(a => a.favoritos))
        }
    }, [favoritos])


    const agregar = (a) => {
        console.log(a)
        console.log('asd')
    }
    const [selected, setSelected] = React.useState('')
    const navegar = (a) => {
        history(`/detalle/${a}`)

    }
    const colores = (a) => {
        if (a === 'Negro') {
            return 'black'
        } if (a === 'Blanco') {
            return '#F6f6f6'
        } if (a === 'Verde Menta') {
            return '#ADDED9'
        } if (a === 'Morado') {
            return '#c7acbf'
        } if (a === 'Azul Petróleo') {
            return '#47527F'
        } if (a === 'Verde') {
            return '#ADDED9'
        }
        if (a === 'Purple') {
            return '#9c29a1'
        }
        if (a === 'Blue') {
            return '#4c94d6'
        }
    }

    return (
        <Carousel
            showStatus={false}
            showThumbs={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = {
                    marginLeft: 20,
                    backgroundColor: c.imagenes.length > 0 ? colores(c.imagenes[index].name) : console.log('asd'),
                    cursor: "pointer",
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    marginTop: 5,
                    border: '1px solid white',

                    //borderColor: colores(color[index])
                }
                const style = isSelected
                    ? { ...defStyle, border: 'solid 2px white' }
                    : { ...defStyle };

/*                    const prueba = isSelected ? console.log(c.imagenes[index].color) : <></>
 */                return (
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

                    </div>
                );
            }}
        >

            {
                c.imagenes.length > 0 && (c.imagenes.map((a, index) =>
                    <motion.div
                        key={index}
                        className='h-[300px] hover:opacity-70 cursor-pointer ' onClick={() => navegar(c.id)}>
                        <img className='rounded-lg w-full h-full object-cover   ' src={a.images[0]} />

                    </motion.div>
                ))
            }



        </Carousel>
    )
}

export default Carrousel