import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { MdModeEdit } from 'react-icons/md'
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { saveOrder } from "../utils/firebaseFunctions";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const [{ cartShow, cartItems, user, users }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [datos, setDatos] = useState(true)
  const [checkbox, setCheckbox] = useState('efectivo')
  const [pickup, setPickUp] = useState('efectivo')
  const [codigo, setCodigo] = useState('')

  const codigos = ['FIOMORA10','VITOMORA10']
  const navigate = useNavigate();



  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const abrirEdit = () => {
    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: true,
    });
  }
  useEffect(() => {
    /* 
       dispatch({
         type: actionType.SET_CARTITEMS,
         cartItems: [],
       });
   
       localStorage.setItem("cartItems", JSON.stringify([])); */


       if (codigos.indexOf(codigo) === -1){
       
        let totalPrice = cartItems.reduce(function (accumulator, item) {
          return accumulator + item[0].unidades * item[0].precio;
        }, 0);
        setTot(totalPrice);
       }
  




    if (users && user) {
      setDatos(users.filter(a => a.user === user.email))
    }


  }, [tot, flag, user, users, cartItems, checkbox]);

  const checkout = () => {
    if (checkbox === 'mercadopago') {
      mercadopago()
    } else {
      efectivo()
    }
  }

  const promo = (e) => {
    setCodigo(e.target.value)
    console.log(codigos.indexOf(e.target.value))
    if (codigos.indexOf(e.target.value) != -1){
      setTot(tot*0.9)
    } 
   }

  const efectivo = () => {

    const producto = cartItems.map(item =>
    ({
      id: item[0].item.id,
      title: item[0].item.name,
      description: item[0].item.descripcion,
      category_id: item[0].item.categoria,
      quantity: parseInt(item[0].unidades),
      currency_id: 'UYU',
      unit_price: parseInt(item[0].precio),
      tallas: tallasfiltro(item[0].size, parseInt(item[0].unidades), item[0].item.id),
      size: item[0].size,
      color: item[0].colorselected,
      idorden: `${Date.now()
        }`,
    })
    )
    const dataa = {
      id: Date.now().toString(),
      creado: `${new Date()}`,
      items: producto,
      status: 'pendiente',
      metodo: checkbox,
      pickup: pickup,
      total: tot,
      email: user.email,
      name: user.displayName
    }

    saveOrder(dataa)
    navigate("/ordenes/gracias");

  }
  const tallasfiltro = (a, b, c) => {
    console.log(a)
    console.log(b)
    console.log(c)
    return {
      id: c,
      size: a,
      unidades: b
    }

  }
  const mercadopago = () => {

    const producto = cartItems.map(item =>
    ({
      id: item[0].item.id,
      title: item[0].item.name,
      description: item[0].item.descripcion,
      category_id: item[0].item.categoria,
      quantity: parseInt(item[0].unidades),
      currency_id: 'UYU',
      unit_price: parseInt(item[0].precio),
      tallas: tallasfiltro(item[0].size, parseInt(item[0].unidades), item[0].item.id),
      size: item[0].size,
      color: item[0].colorselected,
      idorden: `${Date.now()}`,
    })
    )

    const dataa = {
      id: Date.now().toString(),
      creado: `${new Date()}`,
      items: producto,
      status: 'pendiente',
      total: tot,
      email: user.email,
      metodo: checkbox,
      pickup: pickup,

    }

    saveOrder(dataa)
    console.log(producto)


    const options = {
      method: "POST",
      body: JSON.stringify(producto),
      headers: new Headers({ 'content-type': 'application/json' }),
    };

    fetch("http://localhost:3000/checkout", options)
      .then(response => response.text())
      .then(data => {
        window.location.assign(data);
      });


  }


  const comprar = async () => {
    if (!user) {
      dispatch({
        type: actionType.SET_LOGIN_SHOW,
        loginShow: true,
      });
    } else {
    }

  };





  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      key="1"
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40
      }}


      className="fixed z-[90] top-0 right-0 w-[100vw] md:w-[26vw] h-screen bg-white drop-shadow-md flex flex-col"
    >
      <div className="w-full  z-[10] flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Carrito</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Borrar <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-white rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-[30vh] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">

            <div className="w-full  flex  flex-col">
              <p className="text-gray-400 text-lg">Medio de pago</p>
              <div class="flex items-center rounded">
                <input id="bordered-radio-1" type="radio" value="efectivo" selected onClick={() => setCheckbox('efectivo')} name="bordered-radio" className="w-4 h-4 text-booty bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-1" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Efectivo</label>
              </div>
              <div class="flex items-center rounded">
                <input id="bordered-radio-2" type="radio" value="asdd" onClick={() => setCheckbox('mercadopago')} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-2" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Mercado pago </label>
              </div>
              <div class="flex items-center rounded">
                <input id="bordered-radio-3" type="radio" value="asdd" onClick={() => setCheckbox('transferencia')} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-3" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Transferencia Bancaria</label>
              </div>
            </div>

            {/* <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 200</p>
            </div> */}
            <div className="w-full  flex  flex-col">
              <p className="text-gray-400 text-lg">Pick Up</p>
              <div class="flex items-center rounded">
                <input id="bordered-radio-4" type="radio" value="efectivo" selected onClick={() => setPickUp('trescruces')} name="bordered-radio1" className="w-4 h-4 text-booty bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-4" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Retiro en Tres Cruces</label>
              </div>
              <div class="flex items-center rounded">
                <input id="bordered-radio-5" type="radio" value="asdd" onClick={() => setPickUp('malvin')} name="bordered-radio1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-5" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Retiro en Malvin</label>
              </div>
              <div class="flex items-center rounded">
                <input id="bordered-radio-6" type="radio" value="asdd" onClick={() => setPickUp('envio')} name="bordered-radio1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-6" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Envío (Costo extra <span className='underline cursor-pointer'>Ver zonas</span>)</label>
              </div>
            </div>
            <div class="flex w-full">
              {
                codigos.indexOf(codigo) === -1 ? <input className="w-full text-center p-2 rounded-full" onChange={(e) => promo(e)} placeholder='Codigo promocional' /> :      <input disabled='disabled' className="w-full text-center p-2 rounded-full" value='10% de descuento aplicado!'  placeholder='10% de descuento aplicado!' />
              }
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">

                ${tot}
              </p>

            </div>

            {pickup === 'envio' && (<div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Dirección</p>
            </div>)}
            {
              user ? datos && datos.length > 0 ? datos.map(a =>
                pickup === 'envio' && (
                  <div className="w-full flex items-center justify-between">

                    <div className=" w-full">
                      <p className='text-gray-400 font-bold'>{a.alias}</p>
                      <p className="text-gray-400 text-lg">{a.dire} {a.puerta}, {a.apto}, {a.barrio}</p>
                    </div>
                    <div >
                      <div className='bg-yellow-200 p-2 rounded-full cursor-pointer  shadow-md'> <MdModeEdit onClick={() => abrirEdit()} className=' text-textColor ' /></div>
                    </div>
                  </div>)
              )

                : (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    onClick={() => abrirEdit()}
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 text-textColor text-lg my-2 hover:shadow-lg"
                  >
                    Cargar direccion
                  </motion.button>
                ) : <></>}
            {user ? (
              <motion.button
                onClick={() => checkout()}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={comprar}
              >
                Ingresa para comprar!
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Añade productos al carrito
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
