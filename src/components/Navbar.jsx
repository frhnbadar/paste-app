import React from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full h-[80px] flex justify-between items-center px-20 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-gray-800 backdrop-blur-md">
  <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 tracking-widest select-none drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
    Farhan-Paste
  </h1>

  <div className="flex items-center gap-x-14">
    {NavbarData.map((link, idx) => (
      <NavLink
        key={idx}
        to={link.path}
        className={({ isActive }) =>
          isActive
            ? "text-cyan-400 font-semibold text-lg relative after:content-[''] after:absolute after:w-full after:h-[3px] after:rounded-full after:bg-cyan-400 after:-bottom-1 after:left-0 transition-all duration-300"
            : "text-gray-300 hover:text-cyan-300 font-medium text-lg transition-all duration-300 hover:scale-105"
        }
      >
        {link.title}
      </NavLink>
    ))}
  </div>
</div>


  );
};

export default Navbar;
