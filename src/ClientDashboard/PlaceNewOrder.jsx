import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFilePowerpoint, FaFileAlt } from "react-icons/fa"; // Importing relevant icons

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return <FaFilePdf className="text-red-500 mr-2" />; // PDF icon
    case 'docx':
    case 'doc':
      return <FaFileWord className="text-blue-500 mr-2" />; // Word icon
    case 'xlsx':
    case 'xls':
      return <FaFileExcel className="text-green-500 mr-2" />; // Excel icon
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage className="text-yellow-500 mr-2" />; // Image icon
    case 'pptx':
    case 'ppt':
      return <FaFilePowerpoint className="text-orange-500 mr-2" />; // PowerPoint icon
    case 'txt':
      return <FaFileAlt className="text-gray-600 mr-2" />; // Text file icon
    case 'tex':
      return <FaFileAlt className="text-green-600 mr-2" />; // LaTeX file icon (generic file icon)
    case 'rtf':
      return <FaFileAlt className="text-gray-500 mr-2" />; // Rich Text Format (RTF) icon
    case 'odt':
      return <FaFileAlt className="text-blue-600 mr-2" />; // OpenDocument Text (ODT) icon
    case 'pages':
      return <FaFileAlt className="text-purple-500 mr-2" />; // Apple Pages file icon
    default:
      return <FaFileAlt className="text-gray-500 mr-2" />; // Default icon for unknown file types
  }
};

const PlaceNewOrder = () => {
  const [formData, setFormData] = useState({
    orderType: "",
    subject: "",
    title: "",
    deadline: "",
    instructions: "",
    academicLevel: "",
    attachments: [],
    numberOfPages: "", // Added for Number of Pages
    wordCount: "", // Added for Word Count
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachments" && files) {
      const newFilesArray = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        attachments: [...prevData.attachments, ...newFilesArray],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Place New Order</h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below to place a new order.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            <option value="highschool">Highschool</option>
            <option value="college">College</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Postgraduate</option>
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

        {/* Instructions */}
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

        {/* Attachments */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceNewOrder;
