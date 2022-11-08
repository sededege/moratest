import React, { useEffect } from "react";
import Header from "./components/navs/Header"
import MainContainer from "./components/home/MainContainer";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from "./components/context/StateProvider";
import { getAllFoodItems } from "./components/utils/firebaseFunctions";
import { getAllProductsItems } from "./components/utils/firebaseFunctions";
import { actionType } from "./components/context/reducer";
import Dashboard from "./components/dashboard/Dashboard";
import { getAllUsuarios } from "./components/utils/firebaseFunctions";
import Headerleft from "./components/navs/Headerleft";
import CartContainer from "./components/cart/CartContainer";
import SetAddres from "./components/cart/setAddres";
import Detalle from "./components/producto/Detalle";
import { databooty } from "./components/utils/databooty";
import Favoritos from "./components/home/Favoritos";
import Catalogo from "./components/catalogo/catalogo";
import CreateContainer from "./components/dashboard/createContainer";
import EditItem from "./components/dashboard/editItem";
import Feedback from "./components/cart/Feedback";
import Ordenes from "./components/producto/Ordenes";
import Pre from "./components/utils/Pre";
import ScrollToTop from "./components/utils/scrolltotop";
import ShowLogin from "./components/home/login";

function App() {
  const [{ headerShow, cartShow, editShow,loginShow, products, user, users, foodItems }, dispatch] = useStateValue();
  //const [existeuser, setExisteUsuario] = React.useState(null)
  const [load, upadateLoad] = React.useState(true);
  const [existeuser, setExisteUsuario] = React.useState(null)

  const fetchData = async () => {
    /*  await getAllFoodItems().then((data) => {
       console.log(data)
       dispatch({
         type: actionType.SET_PRODUCTS,
         products: data
       })
     }) */


    await getAllProductsItems().then((data) => {
/*       console.log(data)
 */      dispatch({
        type: actionType.SET_PRODUCTS,
        products: data
      })
    })
  }
console.log(loginShow)
  const fetchUsers = async () => {
    await getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
       if (user && user != null){
        dispatch({
          type: actionType.SET_FAVORITOS,
          favoritos: data.filter(a => a.user === user.email)
        }); 
      } else {
        dispatch({
          type: actionType.SET_FAVORITOS,
          favoritos: ""
        }); 
      }
     
    })


    /*   const existeusuario = users.filter(a => a.user === user.email);
      dispatch({
        type: actionType.SET_USERS,
        userLogged: existeusuario
      }) */
  }

  const location = useLocation();


  useEffect(() => {

    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 3000);

    fetchData();
    fetchUsers();

    /* 
        if (users && user) {
    
          const existeusuario = users.filter(a => a.user === user.email);
          dispatch({
            type: actionType.SET_USERS,
            userLogged: existeusuario
          })
        }
     */
  }, [user])

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <div className='w-screen h-screen bg-white'>



        <main className=" ">
          {
           loginShow ? <ShowLogin/> : <></>
          }
          {
            editShow ? <SetAddres /> : <></>
          }
          {
            cartShow ? <CartContainer className='z-20 fixed' /> : <></>
          }

          <Header />
          {
            headerShow ? <Headerleft /> : <></>
          }
          <Pre load={load} />
          <ScrollToTop />
          <Routes location={location} key={location.pathname}>
            <Route path='/*' element={<MainContainer />} />
            <Route path="/detalle/:productId" element={<Detalle />} />
            <Route path='/Favoritos' element={<Favoritos />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Nuevoproducto' element={<CreateContainer />} />
            <Route path='/edititem' element={<EditItem />} />
            <Route path='/Catalogo' element={<Catalogo />} />
            <Route path='/Ordenes' element={<Ordenes />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
