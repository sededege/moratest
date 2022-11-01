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

const Ordenes = () => {
    const history = useNavigate();

    const [{ orders, user }, dispatch] = useStateValue()
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
        <div className='gap-6 flex mt-[10vh] flex-col px-12 w-[88vw] ml-[12vw] '>
            {

                orders != null ? orders.map((a, index) =>
                    <Accordion
                        key={index}
                        sx={{

                            paddingLeft: 4,
                            paddingRight: 4,

                        }}
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
                                Orden {index}
                            </Typography>
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold',

                            }}>
                                Estado: <span className={colores(a.status)}>{a.status}</span>
                            </Typography>
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'

                            }}>
                                Total: <span className='font-bold'>{a.total}</span>
                            </Typography>
                            <Typography sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'

                            }}>
                                {new Date(a.creado).toLocaleDateString()}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div sx={{

                                width: '55%',
                                fontFamily: 'Poppins',
                                fontSize: 'bold'
                            }}>


                                <table className='w-full text-center'>
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

                            </div>
                        </AccordionDetails>
                    </Accordion>
                ) : <p className='text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ' >Debes iniciar sesion!</p>
            }
        </div>
    )
}

export default Ordenes