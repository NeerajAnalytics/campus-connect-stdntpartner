"use client";
import React from "react";
import { Link } from "react-router-dom";

function InitialPage() {
  return (
    <div className="bg-gray-100 overflow-hidden">
      <div
        className="bg-gray-100 w-full pt-[34px] pb-[15px] px-[19px] max-md:max-w-full"
        space={90}
      >
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[18%] max-md:w-full max-md:ml-0">
            <div className="text-[rgba(92,123,181,1)] text-[40px] font-normal text-center max-md:mt-10">
              CampusConnect
            </div>
          </div>
          <div className="w-[82%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow items-center gap-[30px] text-[32px] text-black font-normal max-md:max-w-full max-md:mt-10">
              <div className="self-stretch my-auto">Home</div>
              <div className="self-stretch grow shrink w-[281px] my-auto">
                Connect With Senior
              </div>
              <div className="self-stretch grow shrink w-[187px] my-auto">
                Accomodation{" "}
              </div>
              <div className="bg-[rgba(125,155,210,1)] border self-stretch text-4xl text-black font-bold whitespace-nowrap text-center pt-[17px] pb-[33px] px-[70px] rounded-[30px] border-black border-solid max-md:px-5">
                Login/Sign-up
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center text-4xl font-bold pl-[19px] pr-[45px] max-md:max-w-full max-md:pr-5">
        <div className="self-stretch shrink-0 h-1 border-black border-solid border-4 max-md:max-w-full" />
        <div className="text-[rgba(21,62,117,1)] text-8xl ml-14 mt-[148px] max-md:max-w-full max-md:text-[40px] max-md:mt-10">
          Help with college
          <br />
          admission document
          <br />
          verification through
          <br />
          seniors
        </div>
        <div className="text-[rgba(28,56,121,1)] font-medium mt-[90px] max-md:max-w-full max-md:mt-10">
          Reliable assistance for students during the admissions process
        </div>
        <div className="bg-[rgba(125,155,210,0.57)] flex w-[851px] shrink-0 max-w-full h-[119px] mt-[190px] rounded-[30px] max-md:mt-10" />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ea761759df064ce89c6976038e78dca1/a675957418ddeac4f7789fcc04df1aa441daf0dc?placeholderIfAbsent=true"
          alt="Students collaborating"
          className="aspect-[1] object-contain w-[746px] z-10 mt-[-327px] max-w-full ml-[26px] max-md:mt-[-200px]"
        />
        <div className="bg-[rgba(125,155,210,0.57)] flex w-[824px] shrink-0 max-w-full h-[119px] ml-[41px] mt-[210px] rounded-[30px] max-md:mt-10" />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ea761759df064ce89c6976038e78dca1/d11d7bbf3a45b9a4ea44d6c4924cbe6d310fa120?placeholderIfAbsent=true"
          alt="Document verification"
          className="aspect-[1.13] object-contain w-[746px] z-10 mt-[-210px] max-w-full max-md:mt-[-200px]"
        />
        <Link
          to="/register"
          className="bg-[rgba(26,78,138,1)] w-[343px] max-w-full text-[rgba(255,244,244,1)] text-center mt-[625px] pt-[15px] pb-10 px-[70px] rounded-[30px] max-md:mt-10 max-md:px-5"
        >
          Get started
        </Link>
      </div>
      <div className="bg-[rgba(125,155,210,1)] flex w-full flex-col items-stretch mt-[59px] py-[37px] max-md:max-w-full max-md:mt-10">
        <div
          className="w-full max-w-[1258px] ml-[45px] max-md:max-w-full"
          space={42}
        >
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[45%] max-md:w-full max-md:ml-0">
              <div className="grow max-md:max-w-full max-md:mt-10" space={19}>
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  <div className="w-[55%] max-md:w-full max-md:ml-0">
                    <div className="text-[32px] text-black font-normal max-md:mt-[19px]">
                      <div className="max-md:mr-[9px]">How Can we Help ?</div>
                      <div className="mt-[25px]">Contact us any time</div>
                    </div>
                  </div>
                  <div className="w-[45%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch text-[32px] text-black font-normal max-md:mt-[19px]">
                      <div className="ml-[29px] max-md:ml-2.5">Call Us</div>
                      <div className="mt-1.5">
                        +91 9704927248
                        <br />
                        +91 850093952
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[55%] ml-5 max-md:w-full max-md:ml-0">
              <div className="max-md:max-w-full max-md:mt-10" space={151}>
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  <div className="w-[73%] max-md:w-full max-md:ml-0">
                    <div className="flex grow flex-col items-stretch text-[32px] text-black font-normal max-md:mt-10">
                      <div>Send Us a Message</div>
                      <div className="mt-[25px]">stdntpartner@gmail.com</div>
                    </div>
                  </div>
                  <div className="w-[27%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="text-black text-[32px] font-normal max-md:mt-10">
                      Follow Us
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex w-full flex-col items-stretch font-normal justify-center py-px max-md:max-w-full">
          <div className="bg-gray-100 flex w-full items-stretch gap-5 flex-wrap justify-between px-[60px] py-10 max-md:max-w-full max-md:px-5">
            <div className="text-[rgba(92,123,181,1)] text-[40px] text-center">
              CampusConnect
            </div>
            <div className="flex items-stretch gap-[40px_45px] text-[32px] text-black mt-[5px] max-md:max-w-full">
              <div>Home</div>
              <div>FAQ's </div>
              <div className="basis-auto">Terms & Conditions </div>
            </div>
          </div>
        </div>
        <div className="text-black text-[32px] font-normal self-center mt-[25px]">
          Copyright © Student Partner
        </div>
      </div>
    </div>
  );
}
export default InitialPage;
