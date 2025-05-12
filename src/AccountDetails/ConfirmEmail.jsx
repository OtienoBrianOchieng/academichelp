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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Email</h2>
         <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Confirm
          </button>
      </div>
    </div>
  );
};

export default ConfirmEmail;