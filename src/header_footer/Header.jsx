import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear authentication data
    clearAuth();
    
    // 2. Redirect to login page
    navigate('/login');
    
    // 3. Force reload to reset all application state
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold hover:scale-105 transition-transform duration-200 flex items-center"
        >
          <span className="mr-2">📚</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-100 to-white">
            AcademicHelp
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 py-4 md:py-0">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {isAuthenticated() && (
            <Link to="/dashboard" className="nav-link">Profile</Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-3 mt-4 md:mt-0">
          {isAuthenticated() ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-full font-semibold hover:bg-white/10 transition duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full font-semibold hover:bg-white/10 transition duration-300 border border-white/30 hover:border-white/50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

// NavLink component for cleaner code (optional)
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="relative group hover:text-green-100 transition duration-300"
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
  </Link>
);

export default Header;