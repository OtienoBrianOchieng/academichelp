import React, { useState } from "react";

import { Link, useNavigate  } from "react-router-dom"; // Import Link for routing

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

  const navigate = useNavigate()

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
    navigate('/ConfirmEmail')
    // Add your signup logic here (e.g., API call to register the student)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        {/* Course or Program */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Course or Program:</label>
            <input
              type="text"
              name="courseOrProgram"
              value={formData.courseOrProgram}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* State/Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">State/Country:</label>
            <input
              type="text"
              name="stateCountry"
              value={formData.stateCountry}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          {/* Verify Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Verify Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>


          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
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
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;