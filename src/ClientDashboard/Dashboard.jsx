import React, { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NavItem = ({ to, icon, label, count, isNavbarCollapsed }) => (
  <Link
    to={to}
    className="flex items-center hover:bg-green-700 p-2 rounded transition-colors relative"
    aria-label={isNavbarCollapsed ? label : undefined}
  >
    <i className={`fas fa-${icon} text-lg mr-3`} aria-hidden="true"></i>
    {!isNavbarCollapsed && <span>{label}</span>}
    {count > 0 && (
      <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
        {count}
      </span>
    )}
  </Link>
);

const Dashboard = () => {
  const [isWelcomeMessageVisible, setIsWelcomeMessageVisible] = useState(true);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    activeOrders: 4,
    revisions: 2,
    completedOrders: 1,
    messages: 3,
    newOrders: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeMessageVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navItems = useMemo(() => [
    { to: "/dashboard/place-new-order", icon: "plus-circle", label: "Place New Order", count: counts.newOrders },
    { to: "/dashboard/active-orders", icon: "tasks", label: "Active Orders", count: counts.activeOrders },
    { to: "/dashboard/revisions", icon: "sync-alt", label: "Revisions", count: counts.revisions },
    { to: "/dashboard/completed-orders", icon: "check-circle", label: "Completed Orders", count: counts.completedOrders },
    { to: "/dashboard/messages", icon: "envelope", label: "Messages", count: counts.messages },
  ], [counts]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`bg-green-600 text-white ${
          isNavbarExpanded ? "w-64" : "w-16"
        } p-6 transition-all duration-300`}
        onMouseEnter={() => setIsNavbarExpanded(true)}
        onMouseLeave={() => setIsNavbarExpanded(false)}
      >
        <div className="flex items-center mb-8">
          <i className="fas fa-user-circle text-2xl mr-3" aria-hidden="true"></i>
          {isNavbarExpanded && <span className="text-lg">John Doe</span>}
        </div>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isNavbarCollapsed={!isNavbarExpanded}
            />
          ))}
        </nav>

     </div>

      <div className="flex-1 p-8 bg-gradient-to-r from-green-600 to-blue-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;