import React from 'react'
import { MdDelete, MdModeEdit, MdOutlineSearch, MdAdd, MdKeyboardBackspace } from 'react-icons/md'
import { useStateValue } from '.././context/StateProvider'

import { borrarproducto } from ".././utils/firebaseFunctions";
import { getAllFoodItems, getAllProductsItems } from '.././utils/firebaseFunctions'
import { actionType } from '.././context/reducer'
import { useNavigate, useParams } from 'react-router-dom'

const TablaListados = ({ data, filter, newitem, ventas }) => {
    /*     console.log(ventas)
      */
    const [edit, setEdit] = React.useState(null)
    const [ids, setIds] = React.useState("")
    const [{ foodItems, editar, products, orders }, dispatch] = useStateValue();
    const [modal, setModal] = React.useState(false)
    const [ideliminar, setIdEliminar] = React.useState(null)
    const [newItem, setNewItem] = React.useState(true)
    const history = useNavigate();

    const borrarproduct = (id) => {
        borrarproducto(id)
        fetchData()
    }


    React.useEffect(() => {
/*         console.log(data)
 */        setIds(ventas.map((a,index) => a.items[index]))
    }, [])

    
/* console.log(ids)
 */

    const fetchData = async () => {
        await getAllProductsItems().then((data) => {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: data
            })
        })

    }

    const editarr = (a) => {
        dispatch({
            type: actionType.SET_EDITAR,
            editar: a
        })
        history(`/edititem`)
    }



    return (
        <div className='flex gap-6 '>
            <div className='mt-4 w-[82vw] drop-shadow-lg  flex items-start justify-center gap-8  h-[50vh] overflow-auto rounded-lg'>
                {
                    data && data.length > 0 ? <table className=' w-full overflow-auto items-center justify-center text-center '>
                        <thead className='text-textColor '>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Categoria</th>
                                <th>Color</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>Ventas</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody  >

                            {
                                data && data.length > 0 ? data.map((a, index) =>
                                    <tr key={index} id={a.id} className='bg-bghome  hover:bg-white rounded-full ' >
                                        <td className='items-center p-2 flex justify-center'><img className='w-10 items-center justify-center block ' src={a.color[0].images} /></td>
                                        <td className='text-textColor text-lg'>{a.name}</td>
                                        <td className='text-textColor text-md'>{a.categoria}</td>
                                        <td className='text-textColor text-md '>{a.color.map((b,index) =>
                                            <p key={index}> {b.name}</p>
                                        )}</td>
                                        <td className='text-textColor text-md '>
                                            {a.color.map((b,index) =>

                                                <p key={index}>{b.tallas[0].stock}</p>

                                            )}
                                        </td>

                                        <td className='text-textColor text-md '>
                                            {a.color.map((b,index) =>
                                                <p key={index}>{b.tallas[1].stock} </p>
                                            )}
                                        </td>
                                        <td className='text-textColor text-md '>
                                            {a.color.map((b,index) =>
                                                <p key={index}>{b.tallas[2].stock}</p>

                                            )}</td>
                                        <td className='text-textColor text-md font-semibold'>5</td>
                                        <td className='text-textColor text-md font-semibold'>$ {a.precio}</td>
                                        <td className='text-black'>
                                            <div className='flex gap-2 items-center justify-center'>
                                                <div onClick={() => editarr(a.id)} className='bg-yellow-200 p-2 rounded-lg cursor-pointer  shadow-md'><MdModeEdit className=' text-textColor ' /></div>
                                                <div onClick={() => borrarproduct(a.id)} className='bg-red-400 p-2 rounded-lg cursor-pointer drop-shadow-lg shadow-md'> <MdDelete className='text-white' /></div>
                                            </div>
                                        </td>

                                    </tr>

                                ) : <></>
                            }

                        </tbody>
                    </table> : <p>No hay datos para mostrar</p>
                }
                {/*   {
                    edit != null ?
                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 200 }}
                        >
                            <p className='font-bold text-2xl text-gray-500  justify-end p-2 absolute right-20' onClick={() => setEdit(null)}><MdKeyboardBackspace /></p>
                            <EditItem edit={edit} />
                        </motion.div>

                        : <></>
                } */}

                {/*             <Modal id={ideliminar} modal={modal} />
 */}        </div>


        </div>


    )
}

export default TablaListados