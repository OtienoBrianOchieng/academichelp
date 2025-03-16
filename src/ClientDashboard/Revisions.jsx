import React from "react";
import { useNavigate } from "react-router-dom";

const Revisions = () => {
  // Sample data for revisions
  const revisions = [
          {
          id: "ORD12348",
          subject: "History",
          deadline: "2023-12-20",
          status: "Revision",
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
      <h2 className="text-2xl font-bold mb-6">Revisions</h2>

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
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Revision Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {revisions.map((revision) => (
              <tr
                key={revision.id}
                onClick={() => handleOrderClick(revision.id)} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{revision.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{revision.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{revision.deadline}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      revision.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : revision.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {revision.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button className="text-green-600 hover:text-green-700 mr-4">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    Cancel
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

export default Revisions;