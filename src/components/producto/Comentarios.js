import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../components/img/avatar.png'
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';
import Rating from '@mui/material/Rating';


const Comentarios = (c) => {
    const comentarios = c.comentarios
    const history = useNavigate();

    const navegar = (a) => {
        console.log(a)
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
        }
    }

    return (
        <div className='py-5'>
            {
                comentarios && comentarios.length > 0 ?

                    <Slider
                        /*  autoplay={true} */
                        autoplaySpeed={5000}
                    >
                        {comentarios.map(a =>
                            <div key={a.id} className='flex items-center justify-center gap-4'>
                                <img className='flex object-contain h-10' src={Avatar} />
                                <div className='flex flex-col'>
                                    <p>{a.nombre}</p>
                                    <Rating
                                        name="simple-controlled"
                                        value={a.rate}

                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "#ffb381"
                                            },
                                            "& .MuiRating-iconHover": {
                                                color: "purple"
                                            }
                                        }}
                                    />
                                    <p>{a.msg}</p>
                                </div>
                            </div>
                        )}

                    </Slider> : <></>
             }
        </div>

    )
}

export default Comentarios