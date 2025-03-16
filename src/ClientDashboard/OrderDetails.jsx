import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileAlt,
  FaArrowLeft,
} from "react-icons/fa"; // Importing relevant icons for attachments

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [revisionMessage, setRevisionMessage] = useState("");
  const [isRevisionVisible, setIsRevisionVisible] = useState(false); // Tracks visibility of revision sections
  const [clientMessage, setClientMessage] = useState(""); // State for client message
  const navigate = useNavigate();

  const handleRevise = () => {
    navigate(-1); // Navigate one step back in the history
  };

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
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-600 mr-2" />; // PDF (red)
      case "docx":
      case "doc":
        return <FaFileWord className="text-blue-600 mr-2" />; // Word (blue)
      case "xlsx":
      case "xls":
        return <FaFileExcel className="text-green-600 mr-2" />; // Excel (green)
      case "pptx":
      case "ppt":
        return <FaFilePowerpoint className="text-orange-600 mr-2" />; // PowerPoint (orange)
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-yellow-500 mr-2" />; // Image (yellow)
      default:
        return <FaFileAlt className="text-gray-500 mr-2" />; // Default icon (gray)
    }
  };

  // Handle new file uploads
  const handleFileChange = (e) => {
    const files = e.target.files;
    setNewFiles([...newFiles, ...Array.from(files)]);
  };

  // Handle revision message input
  const handleRevisionMessageChange = (e) => {
    setRevisionMessage(e.target.value);
  };

  // Handle placing the order on revision
  const handlePlaceOnRevision = () => {
    setOrder({ ...order, status: "Revision" }); // Update order status to "Revision"
    setIsRevisionVisible(true); // Show the revision sections
  };

  // Handle confirming the order as complete
  const handleMarkAsComplete = () => {
    setOrder({ ...order, status: "Completed" });
    setIsRevisionVisible(false); // Hide the revision sections
  };

  // Handle submit revision
  const handleSubmitRevision = (e) => {
    e.preventDefault();
    console.log("Submitted revision with message:", revisionMessage);
    console.log("New files uploaded:", newFiles);
    setIsRevisionVisible(false)
    navigate(-1)
    // Here you would send the updated order (with files and revision message) to your backend
  };

  // Handle client message input
  const handleClientMessageChange = (e) => {
    setClientMessage(e.target.value);
  };

  // Handle sending client message
  const handleSendMessage = () => {
    if (clientMessage.trim() === "") return; // Prevent sending empty messages
    console.log("Client message sent:", clientMessage);
    setClientMessage(""); // Clear the input field
    // Here you would send the message to your backend
  };

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      {/* Back to Dashboard Button */}
      <button
        onClick={handleRevise}
        className="flex items-center bg-green-400 p-2 text-black font-bold hover:text-green-700 hover:bg-white mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Order Number as Header */}
      <h2 className="text-3xl font-bold text-left mb-8 text-black">{`Order No: ${order.id}`}</h2>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column: Order Details */}
        <div className="bg-white p-6 space-y-6 border-r-2 border-green-600">
          <div className="text-left">
            <p className="text-gray-600 text-xl">Subject: {order.subject}</p>
          </div>
          <div className="text-left">
            <p className="text-gray-600 text-xl">Deadline: {order.deadline}</p>
          </div>
          <div className="text-left">
            <p
              className={`text-xl ${
                order.status === "Completed"
                  ? "text-green-600"
                  : order.status === "In Progress"
                  ? "text-blue-600"
                  : order.status === "Revision"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Status: {order.status}
            </p>
          </div>
          <div className="text-left">
            <p className="text-gray-600 text-xl">Instructions: {order.instructions}</p>
          </div>
        </div>

        {/* Second Column: Uploaded Files and Actions */}
        <div className="bg-white p-6">
          {/* Client Uploaded Files */}
          <div className="border-b-2 border-green-600 pb-4">
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

          {/* Writer Uploaded Files */}
          {(order.status === "Revision" || order.status === "Completed") && (
            <div className="border-b-2 border-green-600 pb-4 mt-4">
              <label className="text-lg font-semibold text-gray-700">Writer Uploaded Files:</label>
              <ul className="list-none space-y-2">
                {order.attachments.map((file, index) => (
                  <li key={index} className="flex items-center text-gray-600 text-lg">
                    {getAttachmentIcon(file)} {file}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/*Activate revision */}
          {(order.status === "Revision" || order.status === "Completed") && !isRevisionVisible && (
           <button
           onClick={() => handlePlaceOnRevision()}
           className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
         >
           Request revision
         </button>
          )}

          {/* Revision Section */}
          {isRevisionVisible && (
            <form onSubmit={handleSubmitRevision} className="mt-6 space-y-4 border-b-2 border-green-600 pb-4">
              <div>
                <label className="text-lg font-semibold text-gray-700">Revision Message:</label>
                <textarea
                  value={revisionMessage}
                  onChange={handleRevisionMessageChange}
                  placeholder="Write your revision message here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-lg font-semibold text-gray-700">Upload Additional Files:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="space-y-2 mt-4">
                {newFiles.length > 0 && (
                  <ul className="space-y-2">
                    {newFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-gray-600 text-lg">
                        {getAttachmentIcon(file.name)} {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Submit Revision
              </button>
            </form>
          )}

          {/* Client Message Section */}
          {order.status !== "Completed" && !isRevisionVisible && (
            <div className="mt-6 space-y-4 border-b-2 border-green-600 pb-4">
              <label className="text-lg font-semibold text-gray-700">Send a Message:</label>
              <textarea
                value={clientMessage}
                onChange={handleClientMessageChange}
                placeholder="Ask about your order status, request help, or provide additional details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Send Message
              </button>
            </div>
          )}

          {/* Upload Additional Files Section */}
          {order.status !== "Completed"  && !isRevisionVisible && (
            <div className="mt-6 space-y-4">
              <label className="text-lg font-semibold text-gray-700">Upload Additional Files:</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <div className="space-y-2 mt-4">
                {newFiles.length > 0 && (
                  <ul className="space-y-2">
                    {newFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-gray-600 text-lg">
                        {getAttachmentIcon(file.name)} {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                onClick={() => handleRevise()}
              >
                Submit Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;