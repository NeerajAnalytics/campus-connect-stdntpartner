
import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center px-4 py-12 font-['Poppins'] max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-[#1a4e8a] text-5xl font-bold leading-tight md:text-6xl max-w-4xl">
          Help with college
          <br />
          admission document
          <br />
          verification through
          <br />
          seniors
        </h1>
        <p className="text-[#1a4e8a] text-xl md:text-2xl font-medium">
          Reliable assistance for students during the admissions process
        </p>
      </div>

      <div className="mt-16 relative w-full max-w-2xl flex justify-center">
        <img
          src="/lovable-uploads/83dd3bdf-de6a-43ad-824a-079319104396.png"
          alt="Students discussing document verification"
          className="w-full max-w-md mx-auto"
        />
      </div>

      <Link
        to="/register"
        className="mt-12 bg-[#1a4e8a] text-white px-12 py-3 rounded-full text-lg font-medium hover:bg-[#153e75] transition-colors"
      >
        Get started
      </Link>
    </section>
  );
};

export default Hero;
