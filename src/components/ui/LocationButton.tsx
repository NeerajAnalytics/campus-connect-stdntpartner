
import React from "react";
import { Button } from "./button";

interface LocationButtonProps {
  children: React.ReactNode;
  className?: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({ children, className = "" }) => {
  const handleLocationClick = () => {
    // Open NITJ location in Google Maps
    window.open("https://maps.app.goo.gl/myPHXyFNtzPoYw8F6", "_blank");
  };

  return (
    <Button
      onClick={handleLocationClick}
      className={`bg-[#7d9bd2] text-black hover:bg-[#6b89c0] transition-colors ${className}`}
    >
      {children}
    </Button>
  );
};

export default LocationButton;
