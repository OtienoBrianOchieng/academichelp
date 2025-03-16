import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          AcademicHelp
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-green-100 transition duration-300">
            Home
          </Link>
          <Link to="/services" className="hover:text-green-100 transition duration-300">
            Services
          </Link>
          <Link to="/contact" className="hover:text-green-100 transition duration-300">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-50 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-50 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;