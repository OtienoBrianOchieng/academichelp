import { useState } from 'react'
import './App.css'
import Home from './Home'
import { Routes, Route } from "react-router-dom";
import Header from './header_footer/Header'
import Footer from './header_footer/Footer'
import Signup from './AccountDetails/Signup';
import Login from './AccountDetails/Login';
import Services from './Services';
import ChangePassword from './AccountDetails/ChangePassword';
import Contact from './Contact';
import ConfirmEmail from './AccountDetails/ConfirmEmail';
import Dashboard from './ClientDashboard/Dashboard';
import PlaceNewOrder from './ClientDashboard/PlaceNewOrder';
import Revisions from './ClientDashboard/Revisions';
import CompletedOrders from './ClientDashboard/CompletedOrders';
import ActiveOrders from './ClientDashboard/ActiveOrders';
import OrderDetails from './ClientDashboard/OrderDetails';
import Messages from './ClientDashboard/Messages';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/services' element={<Services />} />
        <Route path='/forgot-password' element = {<ChangePassword />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/ConfirmEmail' element = {<ConfirmEmail />} />

        {/* Client Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="place-new-order" element={<PlaceNewOrder/>} />
            <Route path="active-orders" element={<ActiveOrders />} />
            <Route path="revisions" element={<Revisions />} />
            <Route path="completed-orders" element={<CompletedOrders />} />
            <Route path="messages" element = {<Messages />} />
          </Route>
                  {/* Order Details Route */}
        <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
