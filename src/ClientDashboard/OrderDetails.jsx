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
  FaTimes,
  FaEdit,
  FaCheck,
  FaPaperclip,
  FaCommentAlt,
  FaDownload,
  FaTrash,
  FaSpinner,
  FaStar,
} from "react-icons/fa";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [revisionMessage, setRevisionMessage] = useState("");
  const [isRevisionVisible, setIsRevisionVisible] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [communicationFiles, setCommunicationFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const navigate = useNavigate();

  const handleRevise = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Mock data with file URLs
      const orders = [
        {
          id: "ORD12345",
          subject: "Biology",
          price: "$40.00",
          deadline: "2023-12-15 12:47",
          status: "Completed",
          instructions: "Write a 1500-word essay on the impact of AI on society.",
          attachments: [
            { name: "document1.pdf", url: "https://example.com/files/document1.pdf" },
            { name: "image1.png", url: "https://example.com/files/image1.png" },
          ],
          rating: null,
          completedAt: new Date().toISOString(),
        },
        {
          id: "ORD12346",
          subject: "History",
          price: "$40.00",
          deadline: "2023-12-20",
          status: "Reviewing",
          instructions: "Analyze the causes of World War I.",
          attachments: [
            { name: "notes.docx", url: "https://example.com/files/notes.docx" },
          ],
          rating: null,
        },
        {
          id: "ORD12347",
          subject: "History",
          price: "$40.00",
          deadline: "2023-12-20",
          status: "Completed",
          instructions: "Analyze the causes of World War I.",
          attachments: [
            { name: "final_paper.docx", url: "https://example.com/files/final_paper.docx" },
          ],
          rating: null,
          completedAt: "2023-12-19T14:30:00Z",
        },
        {
          id: "ORD12348",
          subject: "History",
          price: "$40.00",
          deadline: "2023-12-20",
          status: "Revision",
          instructions: "Analyze the causes of World War I.",
          attachments: [
            { name: "revised_notes.docx", url: "https://example.com/files/revised_notes.docx" },
          ],
          rating: null,
        },
        {
          id: "ORD12349",
          subject: "Mathematics",
          price: "$40.00",
          deadline: "2023-12-18",
          status: "Drafting",
          instructions: "Solve the following calculus problems.",
          attachments: [
            { name: "problems.pdf", url: "https://example.com/files/problems.pdf" },
          ],
          rating: null,
        },
      ];

      const foundOrder = orders.find((o) => o.id === orderId);
      setOrder(foundOrder);
      
      if (foundOrder?.rating) {
        setHasRated(true);
        setRating(foundOrder.rating);
      } else if (foundOrder?.status === "Completed") {
        // Check if they previously clicked "Maybe Later"
        const remindRate = localStorage.getItem(`remindRate_${orderId}`);
        if (!remindRate) {
          // Show prompt after 2 seconds
          setTimeout(() => {
            setShowRatingPrompt(true);
          }, 2000);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getAttachmentIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-600 mr-2" />;
      case "docx":
      case "doc":
        return <FaFileWord className="text-blue-600 mr-2" />;
      case "xlsx":
      case "xls":
        return <FaFileExcel className="text-green-600 mr-2" />;
      case "pptx":
      case "ppt":
        return <FaFilePowerpoint className="text-orange-600 mr-2" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-yellow-500 mr-2" />;
      default:
        return <FaFileAlt className="text-gray-500 mr-2" />;
    }
  };

  const handleFileChange = (e, section) => {
    const files = Array.from(e.target.files);
    if (section === "revision") {
      setNewFiles([...newFiles, ...files]);
    } else if (section === "communication") {
      setCommunicationFiles([...communicationFiles, ...files]);
    }
  };

  const handleRemoveFile = (index, section) => {
    if (section === "revision") {
      const updatedFiles = [...newFiles];
      updatedFiles.splice(index, 1);
      setNewFiles(updatedFiles);
    } else if (section === "communication") {
      const updatedFiles = [...communicationFiles];
      updatedFiles.splice(index, 1);
      setCommunicationFiles(updatedFiles);
    }
  };

  const uploadFiles = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const totalFiles = files.length;
    let uploadedCount = 0;
    
    const uploadPromises = files.map(file => {
      return new Promise((resolve) => {
        setTimeout(() => {
          uploadedCount++;
          setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
          resolve({
            name: file.name,
            url: URL.createObjectURL(file),
          });
        }, 1000);
      });
    });
    
    const uploadedFiles = await Promise.all(uploadPromises);
    setIsUploading(false);
    return uploadedFiles;
  };

  const handleRevisionMessageChange = (e) => {
    setRevisionMessage(e.target.value);
  };

  const handlePlaceOnRevision = () => {
    setOrder({ ...order, status: "Revision" });
    setIsRevisionVisible(true);
  };

  const handleSubmitRevision = async (e) => {
    e.preventDefault();
    
    if (revisionMessage.trim() === "" && newFiles.length === 0) {
      alert("Please provide a revision message or upload files");
      return;
    }
    
    try {
      setIsUploading(true);
      const uploadedFiles = await uploadFiles(newFiles);
      
      console.log("Submitted revision with message:", revisionMessage);
      console.log("Uploaded files:", uploadedFiles);
      
      setRevisionMessage("");
      setNewFiles([]);
      setIsRevisionVisible(false);
      setIsUploading(false);
      
      setOrder({ ...order, status: "Revision" });
      
    } catch (error) {
      console.error("Error submitting revision:", error);
      setIsUploading(false);
    }
  };

  const handleClientMessageChange = (e) => {
    setClientMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (clientMessage.trim() === "" && communicationFiles.length === 0) return;
    
    try {
      setIsUploading(true);
      const uploadedFiles = await uploadFiles(communicationFiles);
      
      console.log("Client message sent:", clientMessage);
      console.log("Uploaded files:", uploadedFiles);
      
      setClientMessage("");
      setCommunicationFiles([]);
      setIsUploading(false);
      
      alert("Message sent successfully!");
      
    } catch (error) {
      console.error("Error sending message:", error);
      setIsUploading(false);
    }
  };

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    console.log("Order cancelled");
    setShowCancelModal(false);
    navigate(-1);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";
    switch (status) {
      case "Completed":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
      case "In Progress":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
      case "Revision":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
      case "Reviewing":
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>{status}</span>;
      case "Drafting":
        return <span className={`${baseClasses} bg-indigo-100 text-indigo-800`}>{status}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const handleRateOrder = () => {
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    console.log("Rating submitted:", rating);
    console.log("Feedback:", feedback);
    
    // In a real app:
    // await api.submitRating(order.id, rating, feedback);
    
    setHasRated(true);
    setShowRatingModal(false);
    setShowRatingPrompt(false);
    setFeedback("");
    
    // Update order with rating
    setOrder({ ...order, rating });
    
    alert(`Thank you for your ${rating} star${rating !== 1 ? 's' : ''}!`);
  };

  const handleRateLater = () => {
    setShowRatingPrompt(false);
    localStorage.setItem(`remindRate_${orderId}`, new Date().toISOString());
  };

  if (!order) {
    return <div className="p-8 text-gray-600">Loading order details...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg max-w-6xl mx-auto overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <button
              onClick={handleRevise}
              className="flex items-center bg-white text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Order No: {order.id}</h1>
            <div className="w-24"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 p-6">
          {/* Order Details Column */}
          <div className="space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200 pr-0 lg:pr-6 pb-6 lg:pb-0">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Subject:</span>
                <span className="font-semibold">{order.subject}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Cost:</span>
                <span className="font-semibold text-green-600">{order.price}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-semibold">{order.deadline}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status:</span>
                {getStatusBadge(order.status)}
              </div>

              <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Instructions</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{order.instructions}</p>
              </div>
            </div>

              {/* Rating Section */}
              {order.status === "Completed" && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {hasRated || order.rating ? "Your Rating" : "Rate This Order"}
                  </h3>
                  {hasRated || order.rating ? (
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < (order.rating || rating) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {order.rating ? `You rated this ${order.rating} star${order.rating !== 1 ? 's' : ''}` : "Thank you for your rating!"}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleRateOrder}
                      className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaStar className="mr-2" />
                      Rate This Order
                    </button>
                  )}
                </div>
              )}
            </div>


            {/* Action Buttons */}
            {order.status !== "Completed" && (
              <div className="flex flex-wrap gap-3 pt-4">
                {!isRevisionVisible && order.status !== "Revision" && (
                  <button
                    onClick={handlePlaceOnRevision}
                    className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Request Revision
                  </button>
                )}
                
                <button
                  onClick={handleCancelOrder}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaTimes className="mr-2" />
                  Cancel Order
                </button>
              </div>
            )}
          </div>

          {/* Files and Communication Column */}
          <div className="space-y-6">
            {/* Files Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Files</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                  <FaPaperclip className="mr-2 text-green-600" />
                  Client Uploaded Files
                </h3>
                {order.attachments.length === 0 ? (
                  <p className="text-gray-500 italic">No attachments provided</p>
                ) : (
                  <ul className="space-y-2">
                    {order.attachments.map((file, index) => (
                      <li 
                        key={index} 
                        className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div className="flex items-center">
                          {getAttachmentIcon(file.name)} 
                          <span className="ml-2 hover:text-green-600 transition-colors">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownload(file.url, file.name)}
                          className="text-gray-400 hover:text-green-600 transition-colors p-1"
                          title="Download file"
                        >
                          <FaDownload />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {(order.status === "Revision" || order.status === "Completed") && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <FaPaperclip className="mr-2 text-blue-600" />
                    Writer Uploaded Files
                  </h3>
                  <ul className="space-y-2">
                    {order.attachments.map((file, index) => (
                      <li 
                        key={index} 
                        className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        <div className="flex items-center">
                          {getAttachmentIcon(file.name)} 
                          <span className="ml-2 hover:text-blue-600 transition-colors">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownload(file.url, file.name)}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                          title="Download file"
                        >
                          <FaDownload />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Revision Section */}
            {isRevisionVisible && (
              <form onSubmit={handleSubmitRevision} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                  <FaEdit className="mr-2 text-yellow-600" />
                  Revision Request
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Revision Message</label>
                    <textarea
                      value={revisionMessage}
                      onChange={handleRevisionMessageChange}
                      placeholder="Please describe what needs to be revised..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Upload Additional Files</label>
                    <div className="flex items-center">
                      <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Choose Files</span>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileChange(e, "revision")}
                          className="hidden"
                        />
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        {newFiles.length} file{newFiles.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                    
                    {newFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {newFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                            <div className="flex items-center truncate">
                              <FaPaperclip className="text-gray-500 mr-2 flex-shrink-0" />
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index, "revision")}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {isUploading && (
                    <div className="pt-2">
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2 text-yellow-600" />
                        <span className="text-sm text-gray-600">
                          Uploading {uploadProgress}%...
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-yellow-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsRevisionVisible(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      disabled={isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center"
                      disabled={isUploading || (revisionMessage.trim() === "" && newFiles.length === 0)}
                    >
                      {isUploading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Submit Revision"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Communication Section */}
            {order.status !== "Completed" && !isRevisionVisible && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                  <FaCommentAlt className="mr-2 text-blue-600" />
                  Communication
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Send Message to Writer</label>
                    <textarea
                      value={clientMessage}
                      onChange={handleClientMessageChange}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Attach Files</label>
                    <div className="flex items-center">
                      <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                        <span className="text-gray-700">Choose Files</span>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileChange(e, "communication")}
                          className="hidden"
                        />
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        {communicationFiles.length} file{communicationFiles.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                    
                    {communicationFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {communicationFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                            <div className="flex items-center truncate">
                              <FaPaperclip className="text-gray-500 mr-2 flex-shrink-0" />
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index, "communication")}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {isUploading && (
                    <div className="pt-2">
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Uploading {uploadProgress}%...
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSendMessage}
                      disabled={isUploading || (clientMessage.trim() === "" && communicationFiles.length === 0)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                        isUploading || (clientMessage.trim() === "" && communicationFiles.length === 0)
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Prompt Modal */}
      {showRatingPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How was your experience?</h3>
            <p className="text-gray-600 mb-6">
              We'd love your feedback to help us improve our service. 
              Please take a moment to rate your completed order.
            </p>
            
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating-prompt"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="text-3xl cursor-pointer mx-1"
                      color={ratingValue <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  </label>
                );
              })}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Any additional feedback?</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like or how can we improve?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="3"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleRateLater}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={submitRating}
                disabled={rating === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  rating === 0 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rate Your Order</h3>
            
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="text-3xl cursor-pointer"
                      color={ratingValue <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  </label>
                );
              })}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Feedback (Optional)</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with this order..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="3"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRating(0);
                  setHoverRating(0);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Order Cancellation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;