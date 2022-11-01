import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'
import { MdDelete, MdModeEdit, MdOutlineSearch, MdAdd } from 'react-icons/md'
import { FiEye, FiShoppingCart } from 'react-icons/fi'
import Carrousel from './Carousel'
import { useNavigate } from 'react-router'

const Favoritos = () => {

    const [{ products, favoritos }, dispatch] = useStateValue()
    const [existeuser, setExisteUsuario] = React.useState(null)
    /* console.log(user)
    console.log(users)
 */

  

    React.useEffect(() => {
        if (favoritos) {
          
            setExisteUsuario(favoritos)

       
        }
    }, [favoritos])


    const productos = (c) => {
        const mostrar = products.filter(b => String(b.id) === String(c))
/*         console.log(mostrar)
 */        return (
            <div key={mostrar[0].id} className='h-full mb-5'>
                <div className='gap-2 flex flex-col'>
                    <div>
                        <Carrousel imagenes={mostrar[0].color} id={mostrar[0].id} />
                    </div>
                    <div className='p-2 rounded-b-lg relative'>
                        <div className='flex justify-between items-center'>
                            <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{mostrar[0].name}</p>
                        </div>
                        <div className='flex mt-2 h-full justify-between  items-center '>
                            <p className='font-bold text-[1.2rem] text-black'>$ {mostrar[0].precio}</p>

                            <FiShoppingCart className='text-[1.4rem] text-booty  ' />
                        </div>

                    </div>
                </div>
            </div>



        )
    }

/*     console.log(existeuser)
 */    return (
        <div className='gap-6 flex flex-col w-[80vw] mt-[5vh] p-10 ml-[14vw] h-full fixed'>
            <p className='text-white bg-booty items-center justify-center w-[100px] text-center font-bold p-2 rounded-lg ' >Favoritos</p>
            <div className=' grid grid-cols-2 md:grid-cols-5 gap-8'>
                {
                    existeuser && existeuser.length > 0 ? existeuser.map(a => (
                        a.favoritos.map(b =>
                            productos(b)
                        )



                    )) : <p className='text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ' >No tienes prendas favoritas :(</p>

                }
            </div>
        </div>

    )
}

export default Favoritos