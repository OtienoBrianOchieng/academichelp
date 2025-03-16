// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import Login from "./AccountDetails/Login";
// import Signup from "./AccountDetails/Signup";
// import ForgotPassword from "./AccountDetails/ForgotPassword";
// import Contact from "./Contact";
// import Dashboard from "./ClientDashboard/Dashboard";
// import PlaceNewOrder from "./ClientDashboard/PlaceNewOrder";
// import ActiveOrders from "./ClientDashboard/ActiveOrders";
// import Revisions from "./ClientDashboard/Revisions";
// import CompletedOrders from "./ClientDashboard/CompletedOrders";
// import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

// const App = () => {
//   const isAuthenticated = true; // Replace with your authentication logic

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Protected Dashboard Routes */}
//         <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
//           <Route path="/dashboard" element={<Dashboard />}>
//             <Route path="place-new-order" element={<PlaceNewOrder />} />
//             <Route path="active-orders" element={<ActiveOrders />} />
//             <Route path="revisions" element={<Revisions />} />
//             <Route path="completed-orders" element={<CompletedOrders />} />
//           </Route>
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;