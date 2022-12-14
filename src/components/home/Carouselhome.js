import React, { useState } from 'react'
import { actionType } from '../context/reducer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
import banner1 from '../img/banner3.png'
import banner2 from '../img/banner2.png'
import banner3 from '../img/banner1.png'
import { categorias } from '../utils/databooty';
import { useLocation } from "react-router-dom";

const CarrouselHome = (c) => {
    const [{ favoritos, products }, dispatch] = useStateValue();
    const history = useNavigate();
    const [prueba, setPrueba] = React.useState("")
    const [filtros, setFiltro] = React.useState("new")
    const [products2, setProducts2] = useState(null)
    const { pathname } = useLocation();
    const titleRef = React.useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [colores2, setColores] = useState([])

    const summer = [
        '1670084410591', '1670016969783', '1670096525127', '1670340785737', '1670086470611', '1670018364063'
    ]
    let array = []

    React.useEffect(() => {
        if (favoritos) {
            setPrueba(favoritos.map(a => a.favoritos))
        }

        if (products2 === null) {
            setProducts2(products)
        }

/*         console.log(products)
 */    }, [favoritos, products2, products])


    /* console.log(products.filter(a => summer.map(b => a.id.includes(b))))
     */

    const categoria = () => {
        products2 && summer.map(b => products2.map(a => a.id.includes(b) === true && array.push(a)))
        dispatch({
            type: actionType.SET_PRODUCTS,
            products: array.sort(() => Math.random() - 0.5)
        });
        /*   var element = titleRef.current;
          var headerOffset = 80;
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          }); */


    };

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
            autoPlay={false}
            infiniteLoop={true}
            interval={5000}

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


            {/*  <motion.div
                className='h-[180px] md:h-[300px] hover:opacity-70 z-[10] cursor-pointer ' >
                <img className='rounded-lg w-full h-full object-cover   ' src={banner3} />

            </motion.div> */}
            <motion.div
                className='h-[180px] md:h-[300px] hover:opacity-70 z-[10] cursor-pointer relative' >
                <button onClick={() => categoria()} className='absolute hidden md:flex z-[30] bg-booty rounded-lg cursor-pointer px-10 md:ml-[calc(62%-50px)] p-1 bottom-[50px] text-white  font-bold'>Visitar</button>
                <button onClick={() => categoria()} className='absolute md:hidden z-[50] right-16 bg-booty rounded-lg cursor-pointer px-2 md:ml-[calc(60%-50px)] text-[0.8rem] p-1 bottom-[30px] text-white  font-bold'>Visitar</button>

                <img className='rounded-lg w-full h-full object-cover   ' src={banner1} />
            </motion.div>
            <motion.div
                className='h-[180px] md:h-[300px] hover:opacity-70 z-[10] cursor-pointer  ' >

                <img className='rounded-lg w-full h-full object-cover   ' src={banner2} />

            </motion.div>



        </Carousel>
    )
}

export default CarrouselHome