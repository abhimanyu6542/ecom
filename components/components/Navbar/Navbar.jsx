import Logo from "../../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { RiUserLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { navLinks } from "../../constants/Navlinks/NavData";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import MobileNavLinks from "./MobileNavLinks";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import SideCart from "../Products/SideCart";
import { BiShoppingBag, BiPlus, BiMinus } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "@bable/redux/features/cartSlice";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalQuantiy = useSelector((state) => state.cart.cartTotalQuantity);
  const totalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.cartItems);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [active, setActive] = useState(null);

  const handleRemove = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const scrollActive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, [active]);
  useEffect(() => {
    dispatch(getTotals());
    // console.log(totalAmount);
    // console.log(totalQuantiy);
    // console.log(cart);
    // console.log("sub total", getTotals);
  }, [cart, dispatch, totalAmount, totalQuantiy]);
  return (
    <div
      className={`${
        active ? "shadow-lg bg-Solitude" : ""
      } fixed w-full top-0 left-0 z-20`}
    >
      <p className="text-center w-full bg-black text-slate-50 py-2">
        Refer a friend & get <span className="text-red-600">$20</span> in
        credits each ✨
      </p>

      <div>
        <div
          className={`${
            active ? "py-2 transition-all duration-300" : "py-4"
          } container  mx-auto flex items-center justify-between px-2`}
        >
          <div className="flex items-center gap-4">
            <HiMenuAlt1
              className="text-3xl xl:hidden cursor-pointer"
              onClick={() => setToggle(true)}
            />
            <div className="ml-16 tracking-wide font-bold">
              <Image src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="xl:flex items-center hidden -ml-72">
            {navLinks.map((navLink) => {
              return <NavLink key={navLink.id} {...navLink} />;
            })}
          </div>
          <div className="flex">
            <div className="mx-2 sm:mx-4 text-base">
              <FiSearch className="font-extrabold h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="mx-2 sm:mx-4 text-base">
              <RiUserLine className="font-extrabold h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="mx-2 sm:mx-4 text-base">
              <AiOutlineHeart className="font-extrabold h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <BiShoppingBag
              className="font-extrabold h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
              onClick={() => setToggle1(true)}
            />
            <span
              key={totalItems}
              className="bg-black items-center cursor-pointer
      rounded-full w-6 relative -top-2 right-1 text-center text-white animate-bounce
      "
            >
              {totalItems.length}
            </span>
          </div>

          {toggle && (
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed h-full w-96 top-0 left-0 z-20 bg-white text-black flex flex-col justify-center items-start shadow-lg gap-3 py-1"
            >
              <div className="flex justify-around ml-6 -mt-[300px]">
                <Link href='/login' className="">Log In </Link>
                <Link href='/register' className="ml-5">Sign Up </Link>
              </div>
              {navLinks.map((navLink) => {
                return (
                  <MobileNavLinks
                    key={navLink.id}
                    {...navLink}
                    setToggle={setToggle}
                  />
                );
              })}
              <HiX
                className="absolute right-12 top-12 text-3xl cursor-pointer"
                onClick={(prev) => setToggle(!prev)}
              />
            </motion.div>
          )}

          {toggle1 && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ x: -1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed h-full -mr-0 w-96 lg:w-[450px] top-0 right-0 z-20 rounded bg-white text-black flex flex-col justify-center items-start shadow-lg gap-3"
            >
              <div className="fixed xl:-mt-[620px] font-['Jost'] -mt-[520px] ml-5 lg:ml-3 text-2xl font-medium text-[#111]">
                Your Cart ({totalItems.length})
              </div>
              <div className="absolute -mt-[450px] w-96 lg:w-[430px]">
                <div className="absolute items-center mx-auto overflow-y-scroll w-full lg:w-[430px]  h-80">
                  <div>
                    {cart.length > 0 ? (
                      <div className=" my-4">
                        {cart.map((cartItem) => (
                          <>
                            <div
                              key={cartItem.id}
                              className="flex justify-between mx-4 items-center"
                            >
                              <Image
                                src={cartItem.image}
                                width={100}
                                height={100}
                                alt="ihugyft"
                              />
                              <div className=" mx-4 flex flex-col justify-between">
                                <div className="font-['Jost']">
                                  {cartItem.title}
                                </div>
                                <div className="my-2 font-['Jost']">Size:</div>
                                <div className="flex items-center px-3 py-6 my-4 border rounded-md border-[#ddd] text-base w-36 justify-between lg:mr-8 h-10">
                                  <button
                                    className="text-md font-bold w-5 h-4 mx-3"
                                    onClick={() => handleDecreaseCart(cartItem)}
                                  >
                                    <BiMinus className="w-6 h-6" />
                                  </button>
                                  <div className="text-md font-bold ml-3 font-['Jost'] w-5 h-4 -pt-4">
                                    {cartItem.cartQuantity}
                                  </div>
                                  <button
                                    className="text-md font-bold w-5 h-4 mx-3"
                                    onClick={() => handleAddToCart(cartItem)}
                                  >
                                    <BiPlus className="w-6 h-6" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-col h-36 my-2 justify-between">
                                <HiX
                                  className="cursor-pointer mr-1 "
                                  onClick={() => handleRemove(cartItem)}
                                />
                                <div className="mr-1 font-['Jost']">
                                  Rs.{cartItem.price}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                        <div className="mt-6 lg:ml-3 ml-6">
                          <div className="font-['Jost'] text-2xl font-medium text-[#111]">
                            You May Like
                          </div>
                          <div className="grid grid-cols-2">
                            <div>product 1</div>
                            <div>product 2</div>
                            <div>product 3</div>
                            <div>product 4</div>
                            <div>product 5</div>
                            <div>product 6</div>
                          </div>
                          <SideCart />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center font-['Jost'] font-bold ">
                          No Product in Your Cart
                        </div>
                        <div className="text-center font-bold my-4">
                          <Link
                            className="px-4 font-['Jost'] py-2 my-4 bg-black text-slate-100 mx-auto text-center items-center"
                            href={"/"}
                            onClick={(prev) => setToggle1(!prev)}
                          >
                            Continue Shoping
                          </Link>
                          <div className="mt-10 -ml-48 lg:-ml-64">
                            <div className="font-['Jost'] text-2xl font-medium text-[#111]">
                              You May Like
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-[400px] xl:mb-[450px]"></div>
              <div className="bg-red-500 py-2 font-['Jost'] text-center w-full">
                🔥 Checkout now 1:34 before they’re GONE!
              </div>
              <div className="flex justify-between w-full my-5 px-8 items-center">
                <div className="font-['Jost']">Subtotal</div>
                <div className="font-['Jost']">Rs.{totalAmount}</div>
              </div>
              <div className="flex justify-between px-8 w-full items-center">
                <button className="lg:px-11 px-9 py-3 cursor-pointer border border-black bg-white text-black rounded-md">
                  <Link
                    className="font-['Jost']"
                    href="/cart"
                    onClick={(prev) => setToggle1(!prev)}
                  >
                    View Cart
                  </Link>
                </button>
                <button onClick={(prev) => setToggle1(!prev)} className="px-12 lg:px-16 font-['Jost'] py-3 cursor-pointer bg-black text-white rounded-md">
                  Checkout
                </button>
              </div>
              <HiX
                className="absolute right-12 top-7 text-xl cursor-pointer"
                onClick={(prev) => setToggle1(!prev)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
