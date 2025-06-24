
import React from "react";
import { Button } from "./button";

interface LocationButtonProps {
  children: React.ReactNode;
  className?: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({ children, className = "" }) => {
  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/myPHXyFNtzPoYw8F6", "_blank");
  };

  return (
    <Button
      onClick={handleLocationClick}
      className={`${className}`}
    >
      {children}
    </Button>
  );
};

export default LocationButton;
