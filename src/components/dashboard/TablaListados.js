import React from 'react'
import { MdDelete, MdModeEdit, MdOutlineSearch, MdAdd, MdKeyboardBackspace } from 'react-icons/md'
import { useStateValue } from '.././context/StateProvider'

import { borrarproducto } from ".././utils/firebaseFunctions";
import { getAllFoodItems, getAllProductsItems } from '.././utils/firebaseFunctions'
import { actionType } from '.././context/reducer'
import { useNavigate, useParams } from 'react-router-dom'
import { AssistantDirection } from '@mui/icons-material';
const arrayprueba = [
    {
        id: '1666902384278',
        talles: [
            {
                id: 0,
                size: 'S',
                unidades: 3,
            },
            {
                id: 1,
                size: 'M',
                unidades: 0,
            },
            {
                id: 2,
                size: 'L',
                unidades: 1,
            },
        ]

    },
    {
        id: '1666902384278',
        talles: [
            {
                id: 0,
                size: 'S',
                unidades: 4,
            },
            {
                id: 1,
                size: 'M',
                unidades: 0,
            },
            {
                id: 2,
                size: 'L',
                unidades: 0,
            },
        ]

    },
    {
        id: '1666902460934',
        talles: [
            {
                id: 0,
                size: 'S',
                unidades: 3,
            },
            {
                id: 1,
                size: 'M',
                unidades: 0,
            },
            {
                id: 2,
                size: 'L',
                unidades: 1,
            },
        ]

    },

]

const TablaListados = ({ data, filter, newitem, ventas }) => {
    /*     console.log(ventas)
      */
    const [edit, setEdit] = React.useState(null)
    const [ids, setIds] = React.useState([])
    const [{ foodItems, editar, products, orders }, dispatch] = useStateValue();
    const [modal, setModal] = React.useState(false)
    const [ideliminar, setIdEliminar] = React.useState(null)
    const [newItem, setNewItem] = React.useState(true)
    const [newArr1, setNewArr1] = React.useState([])


    const history = useNavigate();

    const borrarproduct = (id) => {
        borrarproducto(id)
        fetchData()
    }


    React.useEffect(() => {
        /* console.log('ventaa') */
        /*         console.log(ventas)
         */

        console.log('data')
        console.log(data)
        let newArr = []
        for (var i = 0; i < ventas.length; i++) {
            for (var j = 0; j < ventas[i].length; j++) {
                newArr.push(ventas[i][j])
            }
        }
        setNewArr1(newArr)
        /*  console.log('Array nuevo');
        console.log(newArr); */
        console.log('tallas')
        console.log(newArr1.map(a => a.tallas))



        console.log('arrayprueba')
        console.log(arrayprueba)

        const cambiar = (array) => {
            console.log('array')

            const filtro = array.filter(a => a.id.indexOf('1666902384278') !== -1)
            console.log('filtro')
            console.log(filtro[0].talles)

            const newArr3 = []

            for (var i = 0; i < filtro.length; i++) {
                newArr3.push(filtro[i].talles)

            }
            console.log('newarr2')
            console.log(newArr3)

            let personas = [
                { id: 1, name: 'Darinel', edad: 24, lastName: 'Cigarroa', ciudad: 'CDMX' },
                { id: 2, name: 'Darwin', edad: 24, lastName: 'De jesus', ciudad: 'CDMX' },
                { id: 3, name: 'Vera', edad: 24, lastName: 'Dominguez', ciudad: 'CDMX' },
                { id: 4, name: 'Emiliano', edad: 24, lastName: 'Silva', ciudad: 'CDMX' },
                { id: 5, name: 'Derky', edad: 24, lastName: 'Wilner', ciudad: 'CDMX' },
                { id: 6, name: 'Juan', edad: 24, lastName: 'De La Cruz', ciudad: 'CDMX' },
            ];


            let reduce = personas.reduce((acumulador, actual) => acumulador + actual.edad, 0);
            console.log(reduce)
            console.log('asd')
            console.log(filtro[0].talles)

            const data = {
                id: filtro[0].id,
                tallas: [
                    {
                        id: 0,
                        name: 'S',
                        stock: 0,
                    },
                    {
                        id: 1,
                        name: 'M',
                        stock: 1,

                    },
                    {
                        id: 2,
                        name: 'L',
                        stock: 1,
                    },

                ],
            }
            return console.log(data)
        }


        cambiar(arrayprueba)

    }, [ventas])

    /*  console.log('newArr1');
     console.log(newArr1); */

    /*  const reducedArr = newArr1.reduce((acc, cur) => {
         acc[cur.id] ? acc[cur.id].quantity += cur.quantity : acc[cur.id] = cur;
         return acc;
       }, {});
       
       const output = Object.values(reducedArr);
       console.log('out')
       console.log(output);
 
     console.log(data)
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


    const suma = (a) => {
        /*  console.log(a) */
        if (a.size === 'M') {
            return a.quantity
        }
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
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
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
                                        <td className='text-textColor text-md '>{a.color.map((b, index) =>
                                            <p key={index}> {b.name}</p>
                                        )}</td>
                                        {/*  <td className='text-textColor text-md '>
                                            {a.color.map((b, index) =>
                                                newArr1.map((c, index) =>
                                                    c.size === b.tallas[1].name ?
                                                        <p key={index}>{b.tallas[0].stock - c.quantity}</p> : <p key={index}>{b.tallas[0].stock - c.quantity}</p>
                                                )

                                            )}
                                        </td> */}
                                        <td className='text-textColor text-md '>
                                            {a.color.map((b, index) =>


                                                <p key={index}>{b.tallas[0].stock}</p>


                                            )}
                                        </td>
                                        <td className='text-textColor text-md '>
                                            {a.color.map((b, index) =>

                                                <p key={index}>{b.tallas[1].stock}</p>


                                            )}
                                        </td>

                                        {/*  <td className='text-textColor text-md '>
                                            {a.color.map((b, index) =>
                                                <p key={index}>{b.tallas[1].stock} </p>
                                            )}
                                        </td> */}
                                        <td className='text-textColor text-md '>
                                            {a.color.map((b, index) =>
                                                <p key={index}>{b.tallas[2].stock}</p>

                                            )}</td>
                                        <td className='text-textColor text-md font-semibold'>
                                            {
                                                arrayprueba.map((b, index) =>
                                                    b.id === a.id && (
                                                        <p key={index}>{b.talles[1].unidades}</p>)

                                                )
                                            }

                                        </td>
                                        <td className='text-textColor text-md font-semibold'>
                                            {
                                                arrayprueba.map((b, index) =>
                                                    b.id === a.id && (
                                                        <p key={index}>{b.talles[2].unidades}</p>)

                                                )
                                            }

                                        </td>
                                        <td className='text-textColor text-md font-semibold'>
                                            {
                                                arrayprueba.map((b, index) =>
                                                    b.id === a.id && (
                                                        <p key={index}>{b.talles[0].unidades}</p>)

                                                )
                                            }

                                        </td>
                                        {/*  <td className='text-textColor text-md font-semibold'>
                                            {
                                                newArr1.map((b) =>
                                                    b.id === a.id ?
                                                        <p key={index}>{b.size}</p> : console.log('nada')

                                                )
                                            }

                                        </td> */}
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