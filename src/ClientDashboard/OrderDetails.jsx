import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAlt } from "react-icons/fa"; // Importing relevant icons for attachments

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);

  // Fetch order details (replace with your API call)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orders = [
        {
          id: "ORD12345",
          subject: "Biology",
          deadline: "2023-12-15 12:47",
          status: "In Progress",
          instructions: "Write a 1500-word essay on the impact of AI on society.",
          attachments: ["document1.pdf", "image1.png"],
        },
        {
          id: "ORD12346",
          subject: "History",
          deadline: "2023-12-20",
          status: "Reviewing",
          instructions: "Analyze the causes of World War I.",
          attachments: ["notes.docx"],
        },
        {
            id: "ORD12347",
            subject: "History",
            deadline: "2023-12-20",
            status: "Completed",
            instructions: "Analyze the causes of World War I.",
            attachments: ["notes.docx"],
          },
          {
            id: "ORD12348",
            subject: "History",
            deadline: "2023-12-20",
            status: "Revision",
            instructions: "Analyze the causes of World War I.",
            attachments: ["notes.docx"],
          },
        {
          id: "ORD12349",
          subject: "Mathematics",
          deadline: "2023-12-18",
          status: "Drafting",
          instructions: "Solve the following calculus problems.",
          attachments: ["problems.pdf"],
        },
      ];

      const foundOrder = orders.find((o) => o.id === orderId);
      setOrder(foundOrder);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <div className="p-8 text-gray-600">Loading order details...</div>;
  }

  const getAttachmentIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf className="text-red-600 mr-2" />; // PDF (red)
      case 'docx':
      case 'doc':
        return <FaFileWord className="text-blue-600 mr-2" />; // Word (blue)
      case 'xlsx':
      case 'xls':
        return <FaFileExcel className="text-green-600 mr-2" />; // Excel (green)
      case 'pptx':
      case 'ppt':
        return <FaFilePowerpoint className="text-orange-600 mr-2" />; // PowerPoint (orange)
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-yellow-500 mr-2" />; // Image (yellow)
      default:
        return <FaFileAlt className="text-gray-500 mr-2" />; // Default icon (gray)
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      {/* Order Number as Header */}
      <h2 className="text-3xl font-bold text-left mb-8 text-black">{`Order No: ${order.id}`} | {`${order.status}`}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column: Order Details (Subject, Deadline, Instructions) */}
        <div className="bg-white p-6 space-y-6">
          <div>
            <p className="text-gray-600 text-xl">Subject:{order.subject}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xl">Deadline:{order.deadline}</p>
          </div>

          <div>
            <p className="text-gray-600 text-xl">Instructions: {order.instructions}</p>
          </div>
        </div>

        {/* Second Column: Uploaded Files */}
        <div className="bg-white p-6">
          <div>
            <label className="text-lg font-semibold text-gray-700">Client Uploaded Files:</label>
            {order.attachments.length === 0 ? (
              <p className="text-gray-600 text-xl">No attachments provided.</p>
            ) : (
              <ul className="list-none space-y-2">
                {order.attachments.map((file, index) => (
                  <li key={index} className="flex items-center text-gray-600 text-lg">
                    {getAttachmentIcon(file)} {file}
                  </li>
                ))}
              </ul>
            )}
          </div>
         <div>
            <label className="text-lg font-semibold text-gray-700">Writer Uploaded Files:</label>
            {(order.status === "Revision" || order.status === "Completed") && (
                <ul className="list-none space-y-2">
                    {order.attachments.map((file, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-lg">
                        {getAttachmentIcon(file)} {file}
                    </li>
                    ))}
                </ul>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
