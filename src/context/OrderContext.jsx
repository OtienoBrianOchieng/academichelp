// contexts/OrderContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_id = sessionStorage.getItem('id')
  const token = sessionStorage.getItem('access_token')

    const fetchOrders = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`/api/orders/${ user_id }`); // Send as payload
        const reversedData = response.data.reverse()
        setOrders(reversedData);
        setError(null);
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        console.error("Error:", err.response?.data); // Debugging
    } finally {
        setLoading(false);
    }
    };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
      await fetchOrders(); // Refresh all orders after update
      return true;
    } catch (err) {
      console.error('Status update failed:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading, error, updateOrderStatus, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);