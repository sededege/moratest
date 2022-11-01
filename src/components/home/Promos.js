import React from 'react'
import { useStateValue } from '../context/StateProvider'
import { databooty } from '../utils/databooty'
import mp from '.././img/mp.webp'
import box from '.././img/box.png'
import sale from '.././img/sale.png'
import { MdArrowForwardIos } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { actionType } from '.././context/reducer'

const Promos = () => {
    const [{ products, cartShow, pedido, editShow, headerShow, detalleShow }, dispatch] = useStateValue();
    const refContainer = React.useRef();
    const [scrollValue, setScrollValue] = React.useState(0)
    const history = useNavigate();

    const navegar = (a) => {
      
        if (a === 'Calzas') {
            history(`/catalogo`)
            dispatch({
                type: actionType.SET_CATEGORY,
                categoryselect: 'Calzas'
            })
        } else if (a === 'Tops') {
            history(`/catalogo`)
            dispatch({
                type: actionType.SET_CATEGORY,
                categoryselect: 'Tops'
            })
        } 
         else if (a === 'Conjuntos') {
            history(`/catalogo`)
            dispatch({
                type: actionType.SET_CATEGORY,
                categoryselect: 'Conjuntos'
            })
        } 
         else if (a === 'Shorts') {
            history(`/catalogo`)
            dispatch({
                type: actionType.SET_CATEGORY,
                categoryselect: 'Shorts'
            })
        } 
        
        else if (a === 'Home') {
            history(`/Home`)
            
        } else if (a === 'Añadir') {
            history(`/nuevoproducto`)
        } else if (a === 'Dashboard') {
            history(`/Dashboard`)
        }
    }


    React.useEffect(() => { }, [scrollValue, cartShow]);

    return (
        <div className="grid grid-cols-8 gap-10 rounded-lg">
            <div className="col-span-8 md:col-span-2 grid grid-cols-8 md:grid-cols-4  gap-5">
                <div className="col-span-8 md:col-span-4 bg-booty4 h-full rounded-lg p-10 items-center flex justify-between">
                    <div className='flex'>
                        <p className='font-bold text-textColor text-[1rem]'>Las primeras 100 compras <br></br>
                            <span className='font-semibold'> obtienen un 10% OFF.</span><br></br> <span className='text-sm font-normal'>Codigo: MORA10</span></p>
                    </div>
                    <div className=' flex justify-end items-end '>
                        <img className=' w-32' src={sale} />
                    </div>

                </div>
                <div className="col-span-8 md:col-span-4 bg-booty1 h-[10vh] rounded-lg p-10 items-center flex justify-between ">
                    <div className='flex'>
                        <p className='font-bold text-textColor text-[1rem]'>Envio gratis<br></br>
                            <span className='font-semibold text-lg'> en compras mayores a $ 2000.</span>
{/*                             <br></br> <span className='text-sm font-normal flex gap-4 mt-2'>Aceptamos <span className='w-20'><img className='w-10' src={mp} /></span> </span>
 */}                            </p>

                    </div>

                 {/*    <div className=' flex justify-end items-end '>
                        <img className=' w-40' src={box} />
                    </div>
 */}

                </div>
            </div>
            <div className="col-span-6 grid-cols-6 gap-10 md:grid hidden">
                <div className="col-span-2  bg-booty2 w-full h-[300px] rounded-lg  ">
                    <div className='flex justify-center items-center overflow-hidden h-full  rounded-lg'>
                        <img className='w-full h-full object-cover' src='https://img.ltwebstatic.com/images3_pi/2021/07/27/162735810266c44715091fec8297fbc4a040946fed_thumbnail_600x.webp' />
                    </div>
                    <div className='flex  bg-white relative '>
                        <div onClick={() => navegar('Calzas')} className='bg-white flex items-center p-2 rounded-full cursor-pointer absolute bottom-4 right-2 '>
                            <p>Calzas</p> <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
                <div  className="col-span-2  bg-booty2 w-full rounded-lg  h-[300px]  ">
                    <div className='flex justify-center items-center overflow-hidden  h-full   rounded-lg'>
                        <img className='w-full h-full object-cover' src='https://img.ltwebstatic.com/images3_pi/2022/02/10/1644489874b578c0fb516b6941ec249948a06244d4_thumbnail_600x.webp' />
                    </div>

                    <div className='flex bg-white relative '>
                        <div onClick={() => navegar('Tops')} className='bg-white flex items-center p-2 rounded-full cursor-pointer absolute bottom-4 right-2 '>
                            <p>Top's</p> <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
                <div className="col-span-2  bg-booty2 w-full rounded-lg  h-[300px] ">
                    <div className='flex justify-center items-center overflow-hidden  h-full   rounded-lg'>
                        <img className='w-full h-full object-cover' src='https://img.ltwebstatic.com/images3_pi/2022/03/10/1646892179830088a9b93c049181d1414acb0b281e_thumbnail_600x.webp' />
                    </div>

                    <div className='flex  bg-white relative '>
                        <div onClick={() => navegar('Shorts')} className='bg-white flex items-center p-2 rounded-full cursor-pointer absolute bottom-4 right-2 '>
                            <p>Short's</p> <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Promos