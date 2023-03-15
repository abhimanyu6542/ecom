import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "@bable/redux/features/cartSlice";
import Image from "next/image";
import { useEffect } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalQuantiy = useSelector((state) => state.cart.cartTotalQuantity);
  const totalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const total = totalAmount + 30;
  
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.cartItems);
  const [coupon, setCoupon] = useState("");
  const [couponAmount, setCouponAmout] = useState();
  const [couponSuccess, setCouponSuccess] = useState("");
  const [couponError, setCouponError] = useState("");
  const allTotal = total - couponAmount;
  

  const couponCode = "ABHISHOP";
  // var allTotal ;

  const getCoupon = () => {
    if(totalAmount > 500){
      if (coupon === couponCode) {
        setCouponAmout(200)
        setCouponSuccess("Coupon Code Successfully Redeemed");
        console.log("all total", allTotal);
      } else {
        setCouponError("Coupon code does not match");
      }
    } else {
      setCouponError("Please add items above Rs.500")
    }
    // window.location.reload();
  };

  const removeCouponCode = () => {
    setCouponSuccess("");
  };

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
    dispatch(getTotals());
  }, [cart, dispatch, totalAmount, totalQuantiy]);

  return (
    <>
      <div className="grid gap-4 mx-8 lg:mx-40 grid-cols-1  md:grid-cols-2">
        {cart.length > 0 ? (
          <>
            <div className="md:mt-10">
              <div className=" flex justify-between items-center">
                <div className="font-['Jost'] text-2xl font-semibold text-[#111]">
                  Your Cart
                </div>
                <div className="font-['Jost'] text-xl font-normal text-[#111]">
                  {totalItems.length} items
                </div>
              </div>
              {cart.map((cartItem) => (
                <>
                  <div key={cartItem.id}>
                    <div className="grid grid-cols-3 py-5 justify-between mx-auto border-[#ddd] border-y-2 ">
                      <Image
                        src={cartItem.image}
                        width={100}
                        height={100}
                        alt=""
                      />
                      <div>
                        <div>{cartItem.title}</div>

                        <div className="my-2 font-['Jost']">Size:</div>
                        <div className="flex items-center px-3 py-6 my-4 border rounded-md border-[#ddd] text-base w-36 justify-between lg:mr-8 h-10">
                          <button
                            className="text-md font-bold w-5 h-4 mx-3"
                            onClick={() => handleDecreaseCart(cartItem)}
                          >
                            <BiMinus className="w-6 h-6" />
                          </button>
                          <div className="text-md font-bold font-['Jost'] ml-3 w-5 h-4 -pt-4">
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
                      <div className="flex flex-col ml-20 my-2 justify-between">
                        <HiX
                          className="cursor-pointer flex items-center justify-center w-6 h-6"
                          onClick={() => handleRemove(cartItem)}
                        />
                        <div className="font-['Jost'] mb-5 ">
                          Rs.{cartItem.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="sm:flex sm:justify-between sm:items-center mt-8">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    {couponSuccess ? (
                      <div
                        className={
                          couponSuccess
                            ? "px-7 py-2 rounded-md text-center transition duration-100 border border-green-600 bg-white text-green-600"
                            : ""
                        }
                      >
                        {couponSuccess}{" "}
                        <p
                          className="cursor-pointer text-red-600"
                          onClick={removeCouponCode}
                        >
                          Remove
                        </p>{" "}
                      </div>
                    ) : (
                      ""
                    )}
                    {couponError ? (
                      <div className="px-7 mb-2 py-2 rounded-md text-center transition duration-100 border border-red-600 bg-white text-red-600">
                        {couponError}
                      </div>
                    ) : (
                      ""
                    )}
                    {couponSuccess ? (
                      ""
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => setCoupon(e.target.value)}
                        className="border-b-2 border"
                      />
                    )}
                  </div>
                  {
                    couponSuccess ? '' : <button
                    onClick={getCoupon}
                    className="ml-2 px-7 py-2 rounded-md hover:bg-[#C8815F] hover:border transition duration-100 border-orange-600 bg-black text-slate-50 cursor-pointer"
                  >
                    Coupon
                  </button>
                  }
                </div>
                <button
                  className="px-8 sm:ml-2 py-2 mt-2 sm:mt-0 rounded-md hover:text-red-600 hover:border transition duration-100 border-orange-600 hover:bg-white bg-red-400 text-slate-50 cursor-pointer  "
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </button>
              </div>

              <div className="font-['Jost'] mt-5 text-2xl font-medium text-[#111] relative">
                You May Also Like
                <div className="items-center mx-auto sm:w-[450px] sm:h-[500px] md:w-full px-2  border h-[420px] "></div>
              </div>
            </div>
            <div className="lg:ml-10 md:mt-10">
              <h1 className="text-2xl font-semibold font-['Jost'] text-[#111] relative">
                Order Summary
              </h1>
              <div className="bg-[#f9f9f9] mt-3 rounded-md border border-[#ddd] items-center mx-auto sm:w-96 sm:h-[630px] md:w-full px-2 h-[650px] ">
                <div className="w-full h-full">
                  <div className="flex justify-between mt-3 w-full h-20 p-5">
                    <p className="text-2xl text-[#555] font-medium">Subtotal</p>
                    <p className="text-2xl text-[#111] font-medium">
                      Rs.{totalAmount}
                    </p>
                  </div>
                  <div className="border-[#ddd] border-t-2 w-full"></div>
                  <div className="w-full p-4">
                    <div className="mt-3 font-['Jost']">Shiping</div>
                    <div className="mt-3 font-['Jost']">Flat rate: $30.00</div>
                    <div className="mt-3 font-['Jost']">Free shipping</div>
                    <div className="mt-3 font-['Jost']">Shipping to CA.</div>
                    <div className="mt-3 flex">
                      <span className="font-['Jost']">Calculate Shipping</span>
                      <CiLocationOn className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                  <div className="border-[#ddd] border-t-2 mt-5 w-full"></div>
                  {couponSuccess ?  <p className="px-7 py-2 rounded-md text-center transition duration-100 border border-green-600 bg-white text-green-600">
                        Flat {couponAmount} off using Coupon Code
                       </p> : ''}
                  <div className="flex justify-between w-full mt-1 h-14 p-5">
                    {couponSuccess ? (
                      <>
                      
                        <p className="text-2xl text-[#555] font-medium">
                          Total
                        </p>

                        <p className="text-2xl text-[#111] font-medium">
                          Rs.{allTotal}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl text-[#555] font-medium">
                          Total
                        </p>

                        <p className="text-2xl text-[#111] font-medium">
                          Rs.{total}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center w-full items-center mx-auto p-5">
                    <button className="bg-black w-full text-base leading-10 rounded-md text-white text-center lg:px-14 lg:py-2 xl:px-32 xl:py-2 font-medium hover:bg-[#C8815F] transition duration-200">
                      Proceed to checkout
                    </button>
                  </div>
                  <div className="w-full h-16 py-4 p-2">
                    <p className="text-center font-['Jost']">
                      Free Shipping on orders over $300
                    </p>
                    <div>
                      <p className="text-center hover:text-[#c8815F] font-['Jost'] mt-2">
                        <Link href="/"> Continue Shopping</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mx-auto font-bold ">
                No Product in Your Cart
              </div>
              <div className="mx-auto text-center font-bold my-4">
                <Link
                  className="px-4 py-2 my-4 bg-black text-slate-100 mx-auto text-center items-center"
                  href={"/"}
                >
                  Continue Shoping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
