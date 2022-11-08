import React, { useState } from "react";
import { MdAdd, MdLogout } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../.././firebase.config";
import { HiMenuAlt2, HiSearch } from 'react-icons/hi'
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const history = useNavigate();
  const [{ user, cartShow, cartItems, dondeestoy }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  console.log(user)
  /* React.useEffect(() => {
   console.log(headerShow)
  }, [headerShow]) */

  const abrirEdit = () => {

    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: true,
    });
    setIsMenu(false);

  }

  const headerShow = () => {
    dispatch({
      type: actionType.SET_HEADER_SHOW,
      headerShow: true,
    });
  }

  const login = async () => {
 /*    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }  */
    if (!user) {
    dispatch({
      type: actionType.SET_LOGIN_SHOW,
      loginShow: true,
    }); } else {
      setIsMenu(!isMenu);
    } 

  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className={`md:w-[80vw] md:ml-[16vw] w-[100vw] px-5  md:px-4 top-0 h-[10vh] fixed bg-white z-[3] '  `}>
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <></>
        {/*  <motion.div
          whileTap={{ scale: 0.6 }}
          onClick={headerShow}
          className='flex gap-2 justify-center items-center  p-2 rounded-lg cursor-pointer'
        >
          <HiMenuAlt2 className="font-bold text-2xl text-textColor" />
        </motion.div> */}
        {
          <Link to={"/"} className="flex items-center">
            <img src={Logo} className="w-2 object-cover" alt="logo" />
          </Link>
        }
        {
          dondeestoy !== 'Detalle' ? <div className="flex flex-col justify-center">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <HiSearch className="text-booty text-2xl  cursor-pointer" />
              </span>
              <input className=" placeholder:italic p-5   block  w-[300px] h-12  rounded-md py-2 pl-9 pr-3 shadow-sm border-gray-600 focus:outline-none focus:border-gray-100 focus:ring-gray-100 focus:ring-1 sm:text-sm" placeholder="Buscador..." type="text" name="search" />
            </label>
          </div> : <></>
        }





        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            {/*  <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Inicio
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Sobre Nosotros
            </li> */}
          </motion.ul>


          <div
            className="relative flex items-center justify-center  cursor-pointer"

          >
            {/*               <RiNotification4Line className="text-textColor text-2xl  cursor-pointer" />
 */}

            {
              dondeestoy === "Dashboard" ? <></> : <div className="flex gap-4">
                <AiFillHeart onClick={() => history(`/Favoritos`)} className="text-booty text-2xl  cursor-pointer" />
                <FiShoppingCart onClick={showCart} className="text-textColor text-2xl  cursor-pointer" />
              </div>
            }




            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-booty flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative flex items-center gap-6">
           { user && (<p>Hola {user.displayName}</p> )}
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user && user.photoURL != null ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => abrirEdit()}
                >
                  Editar datos
                </p>

                {user && user.email === "lindadenisova012@gmail.com" && (
                  <Link to={"/Dashboard"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Dashboard
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <motion.div
          whileTap={{ scale: 0.6 }}
          onClick={headerShow}
        >
          <HiMenuAlt2 className="font-bold text-2xl" />
        </motion.div>

        <Link to={"/Home"} className="flex items-center gap-2">
          <img src={Logo} className="w-20 object-cover ml-8" alt="logo" />
        </Link>

        <div className="flex gap-4 relative">
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <FiShoppingCart onClick={showCart} className="text-booty text-2xl  cursor-pointer" />

            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-booty flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user && user.photoURL != null ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "vetrivel.galaxy@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>

        {/*  <div className="fixed bottom-5 right-5 bg-white p-3 drop-shadow-lg items-center flex rounded-full ">
          <FiShoppingCart onClick={showCart} className="text-black text-2xl  cursor-pointer" />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
