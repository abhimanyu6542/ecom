import Image from 'next/image';
import imageone from '../../assets/slide-1.jpg'
const FirstBanner = () => {
  return (
    <section className="px-3 py-5 bg-white lg:py-10 h-[600px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center gap-5">
            <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                <p className="text-4xl font-bold md:text-7xl text-orange-600">Text</p>
                <p className="text-4xl font-bold md:text-7xl">Text</p>
                <p className="mt-2 text-sm md:text-lg">Text</p>
                <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">Shop Now</button>
            </div>
            <div className="order-1 lg:order-2 mx-auto lg:mr-[330px] h-[400px]">
            <Image
            className=" group-hover:scale-110 bg-neutral-300"
            src={imageone}
            width={450}
            height={50}
            alt='slider Image'
            />
            </div>
        </div>
    </section>
  )
}

export default FirstBanner