import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgba(125,155,210,1)] flex w-full flex-col items-stretch py-[37px] max-md:max-w-full">
      <div className="w-full max-w-[1258px] ml-[45px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[45%] max-md:w-full max-md:ml-0">
            <div className="grow max-md:max-w-full max-md:mt-10">
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
            <div className="max-md:max-w-full max-md:mt-10">
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
            <Link to="/">Home</Link>
            <Link to="/faq">FAQ's</Link>
            <Link to="/terms" className="basis-auto">
              Terms & Conditions{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="text-black text-[32px] font-normal self-center mt-[25px]">
        Copyright © Student Partner
      </div>
    </footer>
  );
};

export default Footer;
