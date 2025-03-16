import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <div className="bg-green-600 text-white w-64 p-6">
        <h2 className="text-2xl font-bold mb-8">Client Dashboard</h2>
        <nav className="space-y-4">
          <Link
            to="/dashboard/place-new-order"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors"
          >
            <i className="fas fa-plus-circle text-lg mr-3"></i>
            <span>Place New Order</span>
          </Link>
          <Link
            to="/dashboard/active-orders"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors"
          >
            <i className="fas fa-tasks text-lg mr-3"></i>
            <span>Active Orders</span>
          </Link>
          <Link
            to="/dashboard/revisions"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors"
          >
            <i className="fas fa-sync-alt text-lg mr-3"></i>
            <span>Revisions</span>
          </Link>
          <Link
            to="/dashboard/completed-orders"
            className="flex items-center hover:bg-green-700 p-2 rounded transition-colors"
          >
            <i className="fas fa-check-circle text-lg mr-3"></i>
            <span>Completed Orders</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;