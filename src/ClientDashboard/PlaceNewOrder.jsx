import React, { useState, useEffect } from "react";
import axios from 'axios'
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFilePowerpoint, FaFileAlt } from "react-icons/fa";

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  


  switch (extension) {
    case 'pdf':
      return <FaFilePdf className="text-red-500 mr-2" />;
    case 'docx':
    case 'doc':
      return <FaFileWord className="text-blue-500 mr-2" />;
    case 'xlsx':
    case 'xls':
      return <FaFileExcel className="text-green-500 mr-2" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage className="text-yellow-500 mr-2" />;
    case 'pptx':
    case 'ppt':
      return <FaFilePowerpoint className="text-orange-500 mr-2" />;
    case 'txt':
      return <FaFileAlt className="text-gray-600 mr-2" />;
    case 'tex':
      return <FaFileAlt className="text-green-600 mr-2" />;
    case 'rtf':
      return <FaFileAlt className="text-gray-500 mr-2" />;
    case 'odt':
      return <FaFileAlt className="text-blue-600 mr-2" />;
    case 'pages':
      return <FaFileAlt className="text-purple-500 mr-2" />;
    default:
      return <FaFileAlt className="text-gray-500 mr-2" />;
  }
};

const PlaceNewOrder = () => {
  const [price, setPrice] = useState(0);
  const [baseRate, setBaseRate] = useState(9);
  const [urgentSurcharge, setUrgentSurcharge] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    orderType: "",
    subject: "",
    title: "",
    deadline: "",
    instructions: "",
    price: "",
    academicLevel: "",
    attachments: [],
    numberOfPages: "",
    wordCount: "",
    paperFormat: "",
    isUrgent: false,
  });

 

  useEffect(() => {
    calculatePrice();
  }, [formData.numberOfPages, formData.isUrgent, formData.academicLevel]);

  const calculatePrice = () => {
    const pages = parseInt(formData.numberOfPages) || 0;
    
    // Set base rate based on academic level
    let newBaseRate = 9;
    if (formData.academicLevel === "graduate" || formData.academicLevel === "postgraduate") {
      newBaseRate = 20;
    }
    setBaseRate(newBaseRate);
    
    // Set urgent surcharge
    const newUrgentSurcharge = formData.isUrgent ? 6 : 0;
    setUrgentSurcharge(newUrgentSurcharge);
    
    // Calculate total price
    const calculatedPrice = pages * (newBaseRate + newUrgentSurcharge);
    setPrice(calculatedPrice);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "attachments" && files) {
      const newFilesArray = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        attachments: [...prevData.attachments, ...newFilesArray],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const removeFile = (fileIndex) => {
    setFormData((prevData) => {
      const newAttachments = prevData.attachments.filter((_, index) => index !== fileIndex);
      return { ...prevData, attachments: newAttachments };
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Add form validation if needed
  if (!formData.title || !formData.instructions) {
    alert('Please fill in all required fields');
    return;
  }
  setIsSubmitting(true);

  try {
    const id = sessionStorage.getItem('id')
    const formDataToSend = new FormData();
    
    // Append all form fields
    formDataToSend.append('orderType', formData.orderType);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('instructions', formData.instructions);
    formDataToSend.append('price', String(price));
    formDataToSend.append('academicLevel', formData.academicLevel);
    formDataToSend.append('numberOfPages', String(formData.numberOfPages));
    formDataToSend.append('wordCount', String(formData.wordCount));
    formDataToSend.append('paperFormat', formData.paperFormat);
    formDataToSend.append('isUrgent', formData.isUrgent ? 'true' : 'false');
    formDataToSend.append('id', id)

    // Append files
    formData.attachments.forEach((file) => {
      formDataToSend.append(`attachments`, file);  // Changed to simple field name
    });

    // Get token from sessionStorage
    const token = sessionStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    console.log(formDataToSend)

    const response = await axios.post('/api/orders',  // Using relative path (proxy setup recommended)
      formDataToSend,
      {
        headers: {
         'Authorization': `Bearer ${token}`
        }
      }
    );

    // Handle success
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      orderType: "",
      subject: "",
      title: "",
      deadline: "",
      instructions: "",
      price: "",
      academicLevel: "",
      attachments: [],
      numberOfPages: "",
      wordCount: "",
      paperFormat: "",
      isUrgent: false,
    });
    setPrice(0);

  } catch (error) {
    console.log('Full error object:', error);
    console.log('Server response:', error.response?.data);
    alert(`Error: ${error.response?.data?.message || error.message}`);
    console.error('Submission error:', error);
    
    let errorMessage = 'Failed to submit order';
    if (error.response) {
      errorMessage = error.response.data.message || 
                   `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'No response from server';
    }
    
    alert(errorMessage);
  }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Place New Order</h2>
      <p className="text-gray-600 mb-6">
        Fill out the form below to place a new order.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two Column Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Type:
              </label>
              <select
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="" disabled>
                  Select Order Type
                </option>
                <option value="essay">Essay</option>
                <option value="research-paper">Research Paper</option>
                <option value="thesis">Thesis</option>
                <option value="assignment">Assignment</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level:
              </label>
              <select
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="" disabled>
                  Select Academic Level
                </option>
                <option value="highschool">Highschool ($9/page)</option>
                <option value="college">College ($9/page)</option>
                <option value="graduate">Graduate ($20/page)</option>
                <option value="postgraduate">Postgraduate ($20/page)</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Computer Science, History"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Preferred topic/title"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline:
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* Urgent Order Section - Made more prominent */}
            <div className={`p-4 rounded-md border ${formData.isUrgent ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  <span className="font-bold">Urgent Order</span>
                  <span className="text-yellow-600 font-semibold"> (+$6 per page)</span>
                </label>
              </div>
              {formData.isUrgent && (
                <p className="mt-2 text-sm text-yellow-700">
                  Your order will be prioritized for faster completion.
                </p>
              )}
            </div>

            {/* Number of Pages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages:
              </label>
              <input
                type="number"
                name="numberOfPages"
                value={formData.numberOfPages}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., 5 pages"
                required
                min="1"
              />
            </div>

            {/* Word Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Word Count:
              </label>
              <input
                type="number"
                name="wordCount"
                value={formData.wordCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., 1500 words"
                required
                min="1"
              />
            </div>

            {/* Paper Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Format:
              </label>
              <select
                name="paperFormat"
                value={formData.paperFormat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="" disabled>
                  Select Paper Format
                </option>
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="Harvard">Harvard</option>
                <option value="Other">Other (Indicate in the instructions)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prominent Price Calculator */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Order Summary</h3>
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">{formData.numberOfPages || 0} pages</span> × 
                  <span className="font-medium"> ${baseRate} base rate</span>
                  {urgentSurcharge > 0 && (
                    <span className="font-medium"> + ${urgentSurcharge} urgent fee</span>
                  )}
                </p>
                {formData.academicLevel && (
                  <p className="text-sm text-gray-600 mt-1">
                    {["graduate", "postgraduate"].includes(formData.academicLevel) 
                      ? "Graduate/PhD level pricing" 
                      : "Highschool/College level pricing"}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions (full width) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions:
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Provide detailed instructions for your order..."
            required
          ></textarea>
        </div>

        {/* Attachments (full width) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments:
          </label>
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            multiple
          />
        </div>

        {/* Display selected file names with icons */}
        {formData.attachments.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Selected files:</p>
            <ul className="space-y-2">
              {formData.attachments.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
                >
                  {getFileIcon(file.name)}
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button (full width) */}
        <div>
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className={`w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg font-semibold shadow-md transition-all ${
        isSubmitting ? 'opacity-80' : ''
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            {/* Spinner icon */}
          </svg>
          Processing...
        </span>
      ) : (
        `Place Order - $${price.toFixed(2)}`
      )}
    </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceNewOrder;