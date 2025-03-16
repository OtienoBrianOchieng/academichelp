import React from "react";
import { useNavigate } from "react-router-dom";

const CompletedOrders = () => {
  // Sample data for completed orders
  const completedOrders = [
      {
          id: "ORD12347",
          subject: "History",
          completionDate: "2023-12-20",
          status: "Completed",
          rating: "5/5",
          instructions: "Analyze the causes of World War I.",
          attachments: ["notes.docx"],
        },
  ];
    const navigate = useNavigate()

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`); // Navigate to the order details page
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Completed Orders</h2>

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
                Completion Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {completedOrders.map((order) => (
              <tr
                key={order.id}
                onClick={() => handleOrderClick(order.id)} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.completionDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                    {order.rating}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button className="text-green-600 hover:text-green-700 mr-4">
                    View
                  </button>
                  <button className="text-blue-600 hover:text-blue-700">
                    Reorder
                  </button>
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