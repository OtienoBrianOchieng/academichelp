import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"; // Make sure to install axios

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError("No verification token found");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      
      const response = await axios.post(
        "/api/auth/verify-email", 
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
        // Auto-redirect after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" 
              alt="Email confirmation" 
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Invalid Link</h2>
            <p className="text-gray-600 text-center mt-2">
              The verification link is invalid or has expired.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" 
            alt="Email confirmation" 
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600 text-center mt-2">
            Click the button below to verify your email address.
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 font-medium">Email verified successfully!</p>
              <p className="text-sm mt-1">Redirecting to login page...</p>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-md text-white font-medium ${
                isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;