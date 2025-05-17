
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from '../context/OrderContext';

const CompletedOrders = () => {
    const { orders, loading, error } = useOrders();
    const navigate = useNavigate();
  
    // Filter orders with 'revision' status
    const completedOrders = orders.filter(order => order.status === "completed");

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (loading) return <div className="p-8 text-center">Loading Orders...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
    if (completedOrders.length === 0) return <div className="p-8 text-center">No completed orders currently</div>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6"> Completed orders</h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                Cost
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                Deadline
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {completedOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <td 
                                    className="px-6 py-4 text-sm text-gray-700"
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    #{order.id}
                                </td>
                                <td 
                                    className="px-6 py-4 text-sm text-gray-700"
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    {order.subject}
                                </td>
                                <td 
                                    className="px-6 py-4 text-sm text-gray-700"
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    {formatPrice(order.price)}
                                </td>
                                <td 
                                    className="px-6 py-4 text-sm text-gray-700"
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    {formatDate(order.deadline)}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            order.status === "revision"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedOrders;