import Image from "next/image";
import countdown from "../../assets/countdown-fashion.png";

const SubHero = () => {
  return (
    <>
      <section className="px-3 bg-[#ddd] gap-3">
        <div className="grid py-8 gap-5 lg:grid-cols-2 grid-cols-1 justify-between">
          <div className="order-1  mx-auto">
            <Image
              className="group-hover:scale-110 transition duration-300"
              src={countdown}
              width={450}
              height='auto'
              alt="slider Image"
            />
          </div>
          <div className="order-1 flex flex-col justify-center items-center lg:items-start lg:ml-24">
            <p className="text-sm font-bold  text-orange-600 font-['Jost'] mb-3">SALE UPTO 60%</p>
            <p className="text-4xl font-bold font-['Jost'] mt-2">Blue classic long sleeves shirt</p>

            <div className="font-bold md:text-4xl mt-6 flex">
                <div className="border font-['Jost'] px-7 py-6 rounded-md">00</div>
                <div className="ml-3 border px-7 font-['Jost'] py-6 rounded-md">b</div>
                <div className="ml-3 border px-7 font-['Jost'] py-6 rounded-md">c</div>
                <div className="ml-3 border px-7 font-['Jost'] py-6 rounded-md">d</div>
            </div>
            <button className="text-lg font-['Jost'] md:text-xl rounded-md bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubHero;
