/* eslint-disable multiline-ternary */
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import Slider from 'react-carousel-responsive'
import 'react-carousel-responsive/dist/styles.css'
import Rating from '@mui/material/Rating'

const Comentarios = (c) => {
  const comentarios = c.comentarios

  return (
        <div className='py-5'>
            {
                comentarios && comentarios.length > 0

                  ? <Slider
                        autoplaySpeed={5000}
                    >
                        {comentarios.map(a =>
                            <div key={a.id} className='flex items-center justify-center gap-4'>
{/*                                 <img className='flex object-contain h-10' alt='avatar' src={Avatar} />
 */}                                <div className='flex flex-col'>
                                    <p>{a.nombre}</p>
                                    <Rating
                                        name="simple-controlled"
                                        value={a.rate}

                                        sx={{
                                          '& .MuiRating-iconFilled': {
                                            color: '#ffb381'
                                          },
                                          '& .MuiRating-iconHover': {
                                            color: 'purple'
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
