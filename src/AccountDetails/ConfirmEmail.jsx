import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Confirmation code submitted:", code);
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmation Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;