/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import { Carousel } from "flowbite-react";
import FirstBanner from "./FirstBanner";
import SecoundBanner from "./SecoundBanner";
import ThirdBnner from "./ThirdBnner";

const Hero = () => {
  return (
    <>
      <Carousel slideInterval={6000}>
        <FirstBanner />
        <SecoundBanner />
        <ThirdBnner />
      </Carousel>
    </>
  );
};

export default Hero;
