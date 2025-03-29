import React from 'react';
import { Link } from "react-router-dom";
// import logo from "../Assist/Hospital_Logo.jpg";

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Find a Hospital", path: "/find-hospital" },
  { name: "SignUp", path: "/signup" },
  { name: "Login", path: "/login" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-blue-900 text-white py-2 text-center text-sm font-semibold">
        Get an expert second opinion from India's leading specialists.
      </div>

      {/* Main Navbar */}
      <div className="bg-blue-600 px-6 md:px-12 py-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="flex items-center space-x-3">
          {/* <img src={logo} alt="Hospital Logo" className="h-14 rounded-lg shadow-md" /> */}
          <div className="text-white">
            <div className="font-bold text-2xl">HOSPITAL</div>
            <div className="text-xs text-gray-200">Your Health, Our Priority</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          {NavLinks.map((link, index) => (
            <div key={index} className="bg-blue-700 px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-800">
              <Link
                to={link.path}
                className="text-white text-sm font-semibold tracking-wide hover:text-gray-300"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;