import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import { MdOutlineSearch } from 'react-icons/md'
import { RiMoneyDollarCircleFill, RiBarChart2Fill, RiInboxUnarchiveFill } from 'react-icons/ri'
import { categories } from '../utils/data'
import { getAllOrders } from '../utils/firebaseFunctions'
import { actionType } from '.././context/reducer'
import TablaListados from './TablaListados'


const Dashboard = () => {
    const [category, setCategory] = React.useState(null);
    const [{ products}, dispatch] = useStateValue()
    const [modal ] = React.useState(false)
    const [orders, setOrders] = React.useState([])
 
   

 
    React.useEffect(() => {
        dispatch({
            type: actionType.SET_DONDE_ESTOY,
            dondeestoy: 'Dashboard'
        })

        getAllOrders().then((data) => {
            setOrders(data.filter(a => a.status === 'pagado'))
        })


    }, [dispatch])


    return (
        <div className='md:px-8 h-[90vh] md:mt-[10vh] w-full flex fixed gap-4'>
          
            <div className='flex flex-col w-[86vw] ml-[14vw]'>
                <div className='flex gap-6 items-center justify-between'>
                    <div className='rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#937DC2] opacity-80'>
                        <RiBarChart2Fill className='text-[7rem] opacity-2 text-gray-800' />
                        <div className='flex flex-col items-center justify-center'><p className='text-[1rem] font-semibold text-gray-800'> Ventas </p><p className='text-[2rem] font-semibold text-gray-800'> 200 </p></div>
                    </div>
                    <div className='rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex gap-8 bg-[#FFABE1] opacity-80'>
                        <RiMoneyDollarCircleFill className='text-[7rem] opacity-2 text-gray-800' />
                        <div className='flex flex-col items-center justify-center'><p className='text-[1rem] font-semibold text-gray-800'> Ganancias</p><p className='text-[2rem] font-semibold text-gray-800'> $ {" "} 20.000</p></div>
                    </div>
                    <div className='rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#FFE6F7] opacity-80'>
                        <RiInboxUnarchiveFill className='text-[7rem] opacity-2 text-gray-800' />
                        <div className='flex flex-col items-center justify-center'><p className='text-[1rem] font-semibold text-gray-800'> Stock</p><p className='text-[2rem] font-semibold text-gray-800'> 150</p></div>
                    </div>
                </div>
                <div className='flex mt-5 gap-20'>
                    <p className='font-bold text-textColor'>Todos los productos</p>
                    <p className='font-semibold text-textColor'>Por categoria</p>
                </div>
                <div className='p-2 flex items-center justify-between'>
                    <div className='flex items-center justify-center'>
                        <input className='p-1 rounded-lg drop-shadow-lg outline-none px-2' type='text' placeholder='buscar' />
                        <div className='p-2 bg-textColor rounded-lg'>
                            <MdOutlineSearch className='text-white' />
                        </div>
                        <select onChange={(e) => setCategory(e.target.value)} className='ml-8 outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
                            <option defaultValue={'todos'} className='bg-white'>Todas las categorias</option>
                            {
                                categories && categories.map(a => (
                                    <option key={a.id} value={a.urlParamName} className='text-base border-0 outline-none capitalize bg-white text-headingColor'> {a.name}</option>
                                ))
                            }
                        </select></div>


                </div>
                <div className=' flex '>
                    <TablaListados ventas={orders.map(a => a.items)} newitem={modal} data={category === 'todos' || category == null ? products : products.filter(n => n.category === category)} filter={category} />
                </div>
            </div>
           
        </div>
    )
}

export default Dashboard




