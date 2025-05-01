import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        {/* Logo with subtle animation */}
        <Link 
          to="/" 
          className="text-2xl font-bold hover:scale-105 transition-transform duration-200 flex items-center"
        >
          <span className="mr-2">📚</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-100 to-white">
            AcademicHelp
          </span>
        </Link>

        {/* Navigation Links - hidden on small screens, shown on medium+ */}
        <nav className="hidden md:flex space-x-8 py-4 md:py-0">
          <Link 
            to="/" 
            className="relative group hover:text-green-100 transition duration-300"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/services" 
            className="relative group hover:text-green-100 transition duration-300"
          >
            Services
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/contact" 
            className="relative group hover:text-green-100 transition duration-300"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Auth Buttons - with better visual hierarchy */}
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full font-semibold hover:bg-white/10 transition duration-300 border border-white/30 hover:border-white/50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-50 hover:shadow-md transition duration-300 shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;