import Image from "next/image";
import Link from "next/link";
import React from "react";
import { addToCart } from "@bable/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const handleAdd = (product) => {
    dispatch(addToCart(product));
    // localStorage.setItem("cartItem", JSON.stringify(product));
  };
  return (
    <>
      <div className="flex flex-col mx-5 font-['Jost'] wow animate__animated animate__fadeInUp">
        <div className="mb-4 h-[370px] w-72 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center items-center bg-neutral-100">
            <div className="mx-auto flex justify-center items-center bg-neutral-100">
              <Image
                src={props.product.image}
                width={250}
                height={250}
                alt={props.product.title}
                
                className=" group-hover:scale-110 transition duration-300 bg-neutral-300"
              />
            </div>
            <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-end justify-end gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
              <Link
                className="px-3 font-['Jost'] text-sm leading-[18px] py-3 my-4 bg-white rounded-full "
                href={"/product/[id]"}
                as={`/product/${props.product.id}`}
                title="Quick View"
              >
                <FiSearch />
              </Link>
              {/* <button title="Add to Cart" className="flex justify-end items-end text-white w-12 h-12 bg-red-400 onClick={() => handleAdd(props.product)} ">
                add
              </button> */}
              <button
                title="add"
                className="flex justify-end items-end text-white w-12 h-12 bg-red-400"
                onClick={() => handleAdd(props.product)}
              >
                Add to cart
              </button>
              <Link
                className="px-3 py-3 my-4 bg-slate-400 text-white"
                href={"/product/[id]"}
                as={`/product/${props.product.id}`}
                title="Add to Cart"
              >
                View Product
              </Link>
            </div>
            <div className="absolute -bottom-5 group-hover:bottom-3 justify-center items-baseline opacity-0 group-hover:opacity-100 transition-all duration-300 ">
              <Link
                className="bg-black text-white px-24 py-3 mb-10 text-center"
                href={"/product/[id]"}
                as={`/product/${props.product.id}`}
                title="Select Option"
              >
                Select Option
              </Link>
            </div>
          </div>
        </div>
        <h1 className="font-normal font-['Jost'] text-sm leading-[18px]">{props.product.title}</h1>

        <p className="font-normal font-['Jost'] text-sm leading-[18px]">Rs.{props.product.price}</p>
      </div>
    </>
  );
};

export default ProductCard;
