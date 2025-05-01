import React from "react";
import { useNavigate } from "react-router-dom";
const ActiveOrders = () => {
  // Sample data for active orders
  const activeOrders = [
    {
        id: "ORD12345",
        subject: "Biology",
        price: "$40.00",
        deadline: "2023-12-15 12:47",
        status: "In Progress",
        instructions: "Write a 1500-word essay on the impact of AI on society.",
        attachments: ["document1.pdf", "image1.png"],
      },
      {
        id: "ORD12346",
        subject: "History",
        price: "$40.00",
        deadline: "2023-12-20",
        status: "Reviewing",
        instructions: "Analyze the causes of World War I.",
        attachments: ["notes.docx"],
      },
        {
          id: "ORD12348",
          subject: "History",
          price: "$40.00",
          deadline: "2023-12-20",
          status: "Revision",
          instructions: "Analyze the causes of World War I.",
          attachments: ["notes.docx"],
        },
      {
        id: "ORD12349",
        subject: "Mathematics",
        price: "$40.00",
        deadline: "2023-12-18",
        status: "Drafting",
        instructions: "Solve the following calculus problems.",
        attachments: ["problems.pdf"],
      },
  ];

  const navigate = useNavigate()

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`); // Navigate to the order details page
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Active Orders</h2>

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
            {activeOrders.map((order) => (
              <tr key={order.id} 
              onClick={() => handleOrderClick(order.id)} 
              className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.price}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.deadline}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Reviewing"
                        ? "bg-blue-100 text-blue-800"
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

export default ActiveOrders;