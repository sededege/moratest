import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { MdDelete, MdModeEdit, MdOutlineSearch } from 'react-icons/md'
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { useNavigate, useParams } from 'react-router-dom'
import { saveOrder } from "../utils/firebaseFunctions";

const CartContainer = () => {
  const history = useNavigate();

  const [{ cartShow, cartItems, user, editShow, users }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [datos, setDatos] = useState(true)
  const [productopagar, setProductosPagar] = useState([])
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
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item[0].unidades * item[0].item.precio;
    }, 0);
    setTot(totalPrice);
    getUsuario()

    /*  setProductosPagar(prevState => [...prevState, {
       id: '1234',
       title: 'Lightweight Paper Table',
       description: 'Inspired by the classic foldable art of origami',
       category_id: 'home',
       quantity: 3,
       currency_id: 'UYU',
       unit_price: 55.41
     }]) */
    console.log(cartItems)
    console.log(users)

  }, [tot, flag, user, users, cartItems]);

  const tallasfiltro = (a,b,c) => {
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

    /*      console.log(cartItems)
     */

    const producto = cartItems.map(item =>
    ({
      id: item[0].item.id,
      title: item[0].item.name,
      description: item[0].item.descripcion,
      category_id: item[0].item.categoria,
      quantity: parseInt(item[0].unidades),
      currency_id: 'UYU',
      unit_price: parseInt(item[0].item.precio),
      tallas: tallasfiltro(item[0].size, parseInt(item[0].unidades),item[0].item.id ),
      size: item[0].size,
      color: item[0].colorselected,
      idorden: `${Date.now()
        }`,
    })
    )


    const dataa = {
      id: `${Date.now()} `,
      creado: `${new Date()} `,
      items: producto,
      status: 'pendiente',
      total: tot,
      email: user.email,
    }

    saveOrder(dataa)
    console.log(producto)


    const options = {
      method: "POST",
      body: JSON.stringify(producto),
      headers: new Headers({ 'content-type': 'application/json' }),
    };

    fetch("https://node-mora.vercel.app/checkout", options)
      .then(response => response.text())
      .then(data => {
        window.location.assign(data);

      });
    /*  fetch("http://localhost:3000/feedback", options2)
       .then(response => response.text())
       .then(data => {
               console.log(data)
          
       }); */


  }

  const getUsuario = () => {
    if (users && user) {
      setDatos(users.filter(a => a.user === user.email))
    }


  }

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed z-[5] top-0 right-0 w-[86vw] md:w-[26vw] h-screen bg-white drop-shadow-md flex flex-col"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
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
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
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
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>

            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Dirección</p>
            </div>
            {
              user ? datos && datos.length > 0 ? datos.map(a =>
                <div className="w-full flex items-center justify-between">

                  <div className=" w-full">
                    <p className='text-gray-400 font-bold'>{a.alias}</p>
                    <p className="text-gray-400 text-lg">{a.dire} {a.puerta}, {a.apto}, {a.barrio}</p>
                  </div>
                  <div >
                    <div className='bg-yellow-200 p-2 rounded-full cursor-pointer  shadow-md'> <MdModeEdit onClick={() => abrirEdit()} className=' text-textColor ' /></div>
                  </div>
                </div>
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
                onClick={() => mercadopago()}
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
              >
                Login to check out
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
