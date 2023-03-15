import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeatureCategories = (props) => {
  return (
    <>
      <div className="flex flex-col mx-5 font-['Jost'] animate__animated animate__fadeInUp">
        <div className="mb-4 h-[370px] w-[400px] relative overflow-hidden group transition">
          <Link
            className="px-24 py-3 mb-10 text-center"
            href={"/category/[category]"}
            as={`/category/${props.product.category}`}
            title="Select Option"
          >
            <div className="w-full h-full flex justify-center items-center bg-neutral-100">
              <div className="mx-auto flex justify-center items-center bg-neutral-100">
                <Image
                  // src={props.product.image}
                  // style={{width='400px'}}
                  width={450}
                  height={300}
                  alt=""
                  className=" group-hover:scale-110 transition duration-300 bg-neutral-300"
                />
              </div>
            </div>
          </Link>
        </div>
        <h1 className="font-normal font-['Jost'] text-sm leading-[18px]">
          title
        </h1>

        <p className="font-normal font-['Jost'] text-sm leading-[18px]">
          Quantity
        </p>
      </div>
    </>
  );
};

export default FeatureCategories;
