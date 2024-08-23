import React from "react";

const CustomBanner = ({ title }) => {
  return (
    <div className="text-white aboutBanner h-56 w-full">
      <div className="barlowCondensed flex items-center h-full text-[50px] max-w-[1240px] mx-auto">
        {title}
      </div>
    </div>
  );
};

export default CustomBanner;
