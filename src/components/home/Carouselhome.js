import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
import banner1 from '../img/ban1.jpeg'
import banner2 from '../img/ban2.jpeg'
import banner3 from '../img/ban3.jpeg'
const CarrouselHome = (c) => {
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
            autoPlay={true}
            

        >

            {/*   {
                c.imagenes.length > 0 && (c.imagenes.map((a, index) =>
                    <motion.div
                        key={index}
                        className='h-[300px] hover:opacity-70 z-[10] cursor-pointer ' onClick={() => navegar(c.id)}>
                        <img className='rounded-lg w-full h-full object-cover   ' src={a.images[0]} />

                    </motion.div>
                ))
            } */}

            
            <motion.div
                className='h-[300px] hover:opacity-70 z-[10] cursor-pointer ' >
                <img className='rounded-lg w-full h-full object-cover   ' src={banner3} />
            </motion.div>


        </Carousel>
    )
}

export default CarrouselHome