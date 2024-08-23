import React from "react";
import { Link } from "react-router-dom";
import nivyLogo from "../../assets/client/nivy.webp";
const NavBar = () => {
  const navBar = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "How It Works",
      link: "/how-it-works",
    },
    {
      title: "FAQs",
      link: "/FAQs",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <navbar>
      <div className="flex justify-between items-center px-8 h-20">
        <img src={nivyLogo} width={193} height={85} alt="nivy logo"></img>
        <div className="flex space-x-8 items-center">
          {navBar?.map((nav, index) => (
            <Link to={nav?.link}>
              <div
                key={index}
                className="text-[#0b1760] hover:text-[#2d43ff] font-light cursor-pointer"
              >
                {nav?.title}
              </div>
            </Link>
          ))}
          <Link to="/login">
            <div className="w-28 h-10 bg-[#2d43ff] hover:bg-[#0b1760] text-white flex items-center justify-center rounded-full cursor-pointer">
              Login
            </div>
          </Link>
        </div>
      </div>
    </navbar>
  );
};

export default NavBar;
