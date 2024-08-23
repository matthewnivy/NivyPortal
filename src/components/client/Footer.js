// import Image from "next/image";
// import Link from "next/link";
import React from "react";
import { Link } from "react-router-dom";
import nivyFooter from "../../assets/client/nivy-footer.png";
const Footer = () => {
  return (
    <footer className="bg-[#070F3C] openSans">
      <div className="max-w-[1240px] mx-auto py-8 text-[#eaeaff]">
        <div className="grid grid-cols-3 text-sm">
          <img src={nivyFooter} width={193} height={85}></img>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Contact Us</div>
            <div className="bg-[#2E43FF] w-[30px] h-[2px] text-center my-4 "></div>
            <div>info@nivyapp.com</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg"> Quick Links</div>
            <div className="bg-[#2E43FF] w-[30px] h-[2px] text-center my-4"></div>
            <div>About</div>
            <div>How It Works</div>
            <div>Schedule a Demo</div>
          </div>
        </div>
      </div>
      <div className="text-[#eaeaff] bg-black text-sm flex justify-end items-center pr-4 openSans h-10">
        Copyright © 2023 Nivy Technologies. All rights reserved. | &nbsp;
        <Link to={"/privacy-policy"}>Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
