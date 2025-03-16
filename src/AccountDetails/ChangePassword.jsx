import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa"; // Icons for form fields

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Change password submitted:", { oldPassword, newPassword });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Old Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Password:</label>
            <div className="relative">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your old password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* New Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password:</label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your new password"
                required
              />
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex items-center justify-center"
          >
            <FaKey className="mr-2" />
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;