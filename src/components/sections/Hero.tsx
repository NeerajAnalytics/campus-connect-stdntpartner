import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="flex w-full flex-col items-center text-4xl font-bold pl-[19px] pr-[45px] max-md:max-w-full max-md:pr-5">
      <div className="self-stretch shrink-0 h-1 border-black border-solid border-4 max-md:max-w-full" />
      <h1 className="text-[rgba(21,62,117,1)] text-8xl ml-14 mt-[148px] max-md:max-w-full max-md:text-[40px] max-md:mt-10">
        Help with college
        <br />
        admission document
        <br />
        verification through
        <br />
        seniors
      </h1>
      <p className="text-[rgba(28,56,121,1)] font-medium mt-[90px] max-md:max-w-full max-md:mt-10">
        Reliable assistance for students during the admissions process
      </p>

      {/* First image with background */}
      <div className="bg-[rgba(125,155,210,0.57)] flex w-[851px] shrink-0 max-w-full h-[119px] mt-[190px] rounded-[30px] max-md:mt-10" />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ea761759df064ce89c6976038e78dca1/a675957418ddeac4f7789fcc04df1aa441daf0dc?placeholderIfAbsent=true"
        alt="College students collaborating"
        className="aspect-[1] object-contain w-[746px] z-10 mt-[-327px] max-w-full ml-[26px] max-md:mt-[-200px]"
      />

      {/* Second image with background */}
      <div className="bg-[rgba(125,155,210,0.57)] flex w-[824px] shrink-0 max-w-full h-[119px] ml-[41px] mt-[210px] rounded-[30px] max-md:mt-10" />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ea761759df064ce89c6976038e78dca1/d11d7bbf3a45b9a4ea44d6c4924cbe6d310fa120?placeholderIfAbsent=true"
        alt="Document verification process"
        className="aspect-[1.13] object-contain w-[746px] z-10 mt-[-210px] max-w-full max-md:mt-[-200px]"
      />

      {/* CTA Button */}
      <Link
        to="/register"
        className="bg-[rgba(26,78,138,1)] w-[343px] max-w-full text-[rgba(255,244,244,1)] text-center mt-[625px] pt-[15px] pb-10 px-[70px] rounded-[30px] max-md:mt-10 max-md:px-5"
      >
        Get started
      </Link>
    </section>
  );
};

export default Hero;
