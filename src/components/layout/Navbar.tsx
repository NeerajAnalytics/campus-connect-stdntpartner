import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 w-full pt-[34px] pb-[15px] px-[19px] max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[18%] max-md:w-full max-md:ml-0">
          <div className="text-[rgba(92,123,181,1)] text-[40px] font-normal text-center max-md:mt-10">
            CampusConnect
          </div>
        </div>
        <div className="w-[82%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex grow items-center gap-[30px] text-[32px] text-black font-normal max-md:max-w-full max-md:mt-10">
            <Link to="/" className="self-stretch my-auto">
              Home
            </Link>
            <Link
              to="/connect"
              className="self-stretch grow shrink w-[281px] my-auto"
            >
              Connect With Senior
            </Link>
            <Link
              to="/accommodation"
              className="self-stretch grow shrink w-[187px] my-auto"
            >
              Accomodation{" "}
            </Link>
            <Link
              to="/login"
              className="bg-[rgba(125,155,210,1)] border self-stretch text-4xl text-black font-bold whitespace-nowrap text-center pt-[17px] pb-[33px] px-[70px] rounded-[30px] border-black border-solid max-md:px-5"
            >
              Login/Sign-up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
