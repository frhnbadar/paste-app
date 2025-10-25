import React, { useState } from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // state for mobile menu

  return (
    <div className="w-full h-[80px] flex justify-between items-center px-6 md:px-20 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-gray-800 backdrop-blur-md">
      
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 tracking-widest select-none drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
        Farhan-Paste
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-x-14">
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

      {/* Mobile Hamburger */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)} // toggle menu
          className="text-gray-300 hover:text-cyan-300 focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute right-0 mt-2 w-40 bg-gray-900 rounded-md shadow-lg flex flex-col gap-y-2 p-4 z-50 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setMenuOpen(false)} // close menu on click
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-semibold text-lg"
                  : "text-gray-300 hover:text-cyan-300 font-medium text-lg"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
