import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { getAllOrders, updatePayment } from '../utils/firebaseFunctions';
import { useNavigate, useParams } from 'react-router';
import { FiEye } from 'react-icons/fi';
import Swal from 'sweetalert2'

const Ordenes = () => {
    const history = useNavigate();
    const type = useParams()
    const Swal = require('sweetalert2')
    const [{ orders, user }, dispatch] = useStateValue()
    console.log(orders)

    const [expanded, setExpanded] = React.useState(false);
    const [ordenesuser, setOrdenesUser] = React.useState([]);
    const [dataa, setData] = React.useState("");
    const [payment, setPayment] = React.useState("");
    const { orden } = useParams()

    const colores = (a) => {
        if (a === 'pendiente') {
            return 'text-yellow-400'
        }
        if (a === 'pagado') {
            return 'text-green-400'
        }
        if (a === 'error') {
            return 'text-red-400'
        }
    }
    const navegar = (a) => {
        history(`/detalle/${a}`)

    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    React.useEffect(() => {
        if (type.type === 'gracias') {
            Swal.fire(
                'Gracias por tu compra!',
                'Nos comunicaremos contigo a la brevedad para coordinar el retiro!',
                'success'
            )
        }

        const options = {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' }),
        };
        const options2 = {
            method: "GET",
            headers: {
                "Authorization": `Bearer TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438`,
            }
        }

        if (dataa === "") {
            fetch(`http://localhost:3000/Ordenes${window.location.search}`, options)
                .then(response => response.text())
                .then(data => {
                    setData(JSON.parse(data))
                });
        } else {

            if (payment === "") {
                fetch(`https://api.mercadopago.com/v1/payments/${dataa.Payment}`, options2)
                    .then(response => response.text())
                    .then(data2 => {
                        setPayment(JSON.parse(data2))

                    });

            } else {
                const data3 = {
                    id: payment.metadata.idorden,
                    status: 'Pagado'
                }
                updatePayment(data3)
            }
        }






        if (user != null) {
            getAllOrders().then((data) => {
                dispatch({
                    type: actionType.SET_ORDERS,
                    orders: user === null ? 'Inicie sesion para ver sus ordenes' : data.filter(a => a.email === user.email)
                })
            })

        }



    }, [ordenesuser, dataa, payment])
    /*  console.log(orders)
 
     console.log(dataa) */




    return (
        <div className='gap-6 flex mt-[10vh] px-5 flex-col md:px-20 md:w-[88vw] md:ml-[12vw] '>
            {

                orders != null ? orders.map((a, index) =>
                    <Accordion
                        key={index}
                        sx={{

                            paddingLeft: 4,
                            paddingRight: 4,

                        }}
                        className='justify-between'
                        expanded={expanded === a.id} onChange={handleChange(a.id)}>
                        <AccordionSummary

                            sx={{

                                padding: 0,

                            }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'

                            }}>
                                Id {index}
                            </Typography>
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold',

                            }}>
                                <span className={colores(a.status)}>{a.status}</span>
                            </Typography>

                            <Typography className='hidden md:flex' sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold',


                            }}>
                                Total: <span className='font-bold'>{a.total}</span>
                            </Typography>
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'

                            }}>
                                {new Date(a.creado).toLocaleDateString().split("/", 2).join('/')}  {new Date(a.creado).toLocaleTimeString().split(":", 2).join(':')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'
                            }}>


                                <table className='w-full text-center text-[0.6rem] md:text-[1rem]'>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Color</th>
                                            <th>Talle</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Ver</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            a.items.map((b, index) =>
                                                <tr key={index}>
                                                    <td>{b.title}</td>
                                                    <td>{b.color}</td>
                                                    <td>{b.size}</td>
                                                    <td>{b.quantity}</td>
                                                    <td>{b.unit_price}</td>
                                                    <td className='text-center justify-center flex'><FiEye className='text-center font-bold text-[1.5rem] text-booty' onClick={() => navegar(b.id)} /></td>
                                                </tr>
                                            )
                                        }


                                    </tbody>
                                </table>

                                {/* 
                                <p className='font-light text-gray-400'>
                                    Total: {a.total}
                                </p>
                                <p className='font-light text-gray-400'>
                                    Status: {a.status}
                                </p> */}
                                <Typography sx={{

                                    width: '55%',
                                    fontFamily: 'Poppins',
                                    fontSize: 'bold',
                                    marginTop: '10px'
                                }}>
                                    Pick up: <span className='font-bold'>{a.pickup}</span>
                                </Typography>
                                <Typography sx={{

                                    width: '55%',
                                    fontFamily: 'Poppins',
                                    fontSize: 'bold',

                                }}>
                                    Metodo: <span className='font-bold'>{a.metodo}</span>
                                </Typography>
                                <Typography  sx={{

                                    width: '55%',
                                    fontFamily: 'Poppins',
                                    fontSize: 'bold',


                                }}>
                                    Total: <span className='font-bold'>{a.total}</span>
                                </Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ) : <p className='text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ' >Debes iniciar sesion!</p>
            }
        </div>
    )
}

export default Ordenes