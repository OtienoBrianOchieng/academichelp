import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons for email and password
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebook } from "react-icons/fa"; // Facebook icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            Login
          </button>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-green-600 hover:text-green-700 font-semibold text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;