import React, { useCallback, useEffect } from 'react'
import Header from './components/navs/Header'
import MainContainer from './components/home/MainContainer'
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './components/context/StateProvider'
import { getAllProductsItems, getAllUsuarios } from './components/utils/firebaseFunctions'
import { actionType } from './components/context/reducer'
import Dashboard from './components/dashboard/Dashboard'
import Headerleft from './components/navs/Headerleft'
import CartContainer from './components/cart/CartContainer'
import SetAddres from './components/cart/setAddres'
import Detalle from './components/producto/Detalle'
import Favoritos from './components/home/Favoritos'
import CreateContainer from './components/dashboard/createContainer'
import EditItem from './components/dashboard/editItem'
import Ordenes from './components/producto/Ordenes'
import Pre from './components/utils/Pre'
import ScrollToTop from './components/utils/scrolltotop'
import ShowLogin from './components/home/login'
import Pedidos from './components/dashboard/Pedidos'
import Usuarios from './components/dashboard/Usuarios'

function App () {
  const [{ dondeestoy, cartShow, editShow, loginShow, user }, dispatch] = useStateValue()
  const [load, upadateLoad] = React.useState(true)

  const fetchData = useCallback(() => {
    getAllProductsItems().then((data) => {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: data
      })
    })
  }, [])

  const fetchUsers = useCallback(() => {
    getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
      if (user && user != null) {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: data.filter(a => a.user === user.email)
        })
      } else {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: ''
        })
      }
    })
  }, [])

  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      upadateLoad(false)
    }, 1000)

    fetchData()
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className='w-screen h-screen bg-white'>
      <main >
        {
          loginShow && (<ShowLogin />)
        }
        {
          editShow && (<SetAddres />)
        }
        <AnimatePresence>
          {cartShow && (
            <CartContainer />
          )}
        </AnimatePresence>
        <Header />
        {
          dondeestoy === 'Dashboard' && (<Headerleft />)
        }

        <AnimatePresence>
          <Pre load={load} />
        </AnimatePresence>

        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path='/*' element={<MainContainer />} />
          <Route path="/detalle/:productId" element={<Detalle />} />
          <Route path='/Favoritos' element={<Favoritos />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Nuevoproducto' element={<CreateContainer />} />
          <Route path='/edititem' element={<EditItem />} />
          <Route path='/Ordenes/:type' element={<Ordenes />} />
          <Route path='/Dashboard/Pedidos' element={<Pedidos />} />
          <Route path='/Dashboard/Usuarios' element={<Usuarios/>} />
        </Routes>

      </main>
    </div>
  )
}

export default App
