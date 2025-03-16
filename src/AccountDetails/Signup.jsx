import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGlobe, FaBook } from "react-icons/fa"; // Icons for form fields

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    stateCountry: "",
    email: "",
    password: "",
    confirmPassword: "",
    courseOrProgram: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
    navigate("/ConfirmEmail");
    // Add your signup logic here (e.g., API call to register the student)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Course or Program */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course or Program:</label>
            <div className="relative">
              <input
                type="text"
                name="courseOrProgram"
                value={formData.courseOrProgram}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your course or program"
                required
              />
              <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* State/Country */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Country:</label>
            <div className="relative">
              <input
                type="text"
                name="stateCountry"
                value={formData.stateCountry}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your state or country"
                required
              />
              <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              required
            />
            <label className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-green-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;