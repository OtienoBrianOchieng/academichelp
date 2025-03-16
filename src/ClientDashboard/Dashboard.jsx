import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true); // State for collapsed navbar
  const navigate = useNavigate(); // Hook for navigation

  // State for counts
  const [counts, setCounts] = useState({
    activeOrders: 4, // Example count for active orders
    revisions: 2, // Example count for revisions
    completedOrders: 1, // Example count for completed orders
    messages: 3, // Example count for messages
  });

  useEffect(() => {
    // Set a timeout to hide the welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear tokens from local storage (or cookies)
    localStorage.removeItem("authToken");

    // Navigate to the homepage
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <div
        className={`bg-green-600 text-white ${
          isNavbarCollapsed ? "w-16" : "w-64"
        } p-6 transition-all duration-300`}
        onMouseEnter={() => setIsNavbarCollapsed(false)} // Expand on hover
        onMouseLeave={() => setIsNavbarCollapsed(true)} // Collapse on mouse leave
      >
        {/* Client Name Icon */}
        <div className="flex items-center mb-8">
          <i className="fas fa-user-circle text-2xl mr-3"></i>
          {!isNavbarCollapsed && <span className="text-lg">John Doe</span>}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/dashboard/place-new-order"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
          >
            <i className="fas fa-plus-circle text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Place New Order</span>}
            {/* Count Indicator */}
            {counts.newOrders > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                {counts.newOrders}
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/active-orders"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
          >
            <i className="fas fa-tasks text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Active Orders</span>}
            {/* Count Indicator */}
            {counts.activeOrders > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                {counts.activeOrders}
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/revisions"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
          >
            <i className="fas fa-sync-alt text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Revisions</span>}
            {/* Count Indicator */}
            {counts.revisions > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                {counts.revisions}
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/completed-orders"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
          >
            <i className="fas fa-check-circle text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Completed Orders</span>}
            {/* Count Indicator */}
            {counts.completedOrders > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                {counts.completedOrders}
              </span>
            )}
          </Link>
          <Link
            to="/dashboard/messages"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
          >
            <i className="fas fa-envelope text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Messages</span>}
            {/* Count Indicator */}
            {counts.messages > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                {counts.messages}
              </span>
            )}
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors w-full"
          >
            <i className="fas fa-sign-out-alt text-lg mr-3"></i>
            {!isNavbarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-r from-green-600 to-blue-100">
        {showMessage && (
          <div>
            <h1 className="text-2xl font-bold mb-4 py-8">Welcome!</h1>
            <h1 className="text-2xl font-bold mb-4">
              Use the dashboard to access features.
            </h1>
          </div>
        )}
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;