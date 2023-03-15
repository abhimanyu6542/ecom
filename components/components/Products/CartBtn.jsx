"use client";
import { BiShoppingBag } from "react-icons/bi";
import { useSelector } from "react-redux";

const CartBtn = (props) => {
  const totalItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className={`${props.className} relative`}>
      <BiShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 mx-2 sm:mx-4" />
      {!!totalItems && (
        <div
          key={totalItems}
          className="bg-black flex justify-center items-center
      rounded-full w-6 absolute -top-2 -right-2 text-white animate-pingOnce
      "
        >
          {totalItems.length}
        </div>
      )}
    </div>
  );
};

export default CartBtn;
