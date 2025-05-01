import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBook, FaGraduationCap, FaEdit, FaFileAlt, FaSearch, 
  FaLaptopCode, FaBrain, FaChartLine, FaUserShield, FaClock,
  FaCalculator, FaDollarSign
} from "react-icons/fa";

const Services = () => {
  // Calculator state and logic
  const [serviceType, setServiceType] = useState("");
  const [academicLevel, setAcademicLevel] = useState("college");
  const [isUrgent, setIsUrgent] = useState(false);
  const [pages, setPages] = useState(1);
  const [price, setPrice] = useState(0);
  const [baseRate, setBaseRate] = useState(9);
  const [urgentSurcharge, setUrgentSurcharge] = useState(0);



    const navigate = useNavigate();
    
 
    const handlePlaceOrder = () => {
      // Redirect to login page
      navigate('/login');
    };
  

  const calculatePrice = () => {
    // Set base rate based on academic level
    let newBaseRate = 9;
    if (academicLevel === "graduate") {
      newBaseRate = 15;
    }
    else if (academicLevel === "postgraduate") {
      newBaseRate = 20;

    }
    
    // Apply service type multiplier
    let serviceMultiplier = 1.0;
    if (serviceType === "Thesis/Dissertation" || serviceType === "Research Papers") {
      serviceMultiplier = 1.2;
    } else if (serviceType === "Editing" || serviceType === "Plagiarism Check") {
      serviceMultiplier = 0.8;
    }
    
    const calculatedBaseRate = newBaseRate * serviceMultiplier;
    const calculatedUrgentSurcharge = isUrgent ? 6 : 0;
    const calculatedPrice = pages * (calculatedBaseRate + calculatedUrgentSurcharge);
    
    setBaseRate(calculatedBaseRate);
    setUrgentSurcharge(calculatedUrgentSurcharge);
    setPrice(Math.max(0, calculatedPrice));
  };

  useEffect(() => {
    calculatePrice();
  }, [pages, isUrgent, academicLevel, serviceType]);

  // Disciplines data with icons
  const disciplines = [
    { id: 1, title: "English 101", icon: <FaBook className="text-blue-500" /> },
    { id: 2, title: "Business Studies", icon: <FaChartLine className="text-green-500" /> },
    { id: 3, title: "Management", icon: <FaUserShield className="text-purple-500" /> },
    { id: 4, title: "History", icon: <FaBook className="text-amber-500" /> },
    { id: 5, title: "Nursing", icon: <FaUserShield className="text-red-500" /> },
    { id: 6, title: "Psychology", icon: <FaBrain className="text-pink-500" /> },
    { id: 7, title: "Health Care", icon: <FaUserShield className="text-teal-500" /> },
    { id: 8, title: "Economics", icon: <FaChartLine className="text-indigo-500" /> },
    { id: 9, title: "Education", icon: <FaGraduationCap className="text-yellow-500" /> },
    { id: 10, title: "Marketing", icon: <FaChartLine className="text-orange-500" /> },
    { id: 11, title: "Communications", icon: <FaEdit className="text-blue-400" /> },
    { id: 12, title: "Political Science", icon: <FaBook className="text-red-400" /> },
    { id: 13, title: "Programming (Python/JS)", icon: <FaLaptopCode className="text-green-600" /> },
    { id: 14, title: "AI Humanization", icon: <FaBrain className="text-purple-600" /> },
  ];

  // Services data with icons
  const services = [
    { id: 1, title: "Essay Writing", icon: <FaEdit className="text-blue-500" /> },
    { id: 2, title: "Research Papers", icon: <FaFileAlt className="text-green-500" /> },
    { id: 3, title: "Thesis/Dissertation", icon: <FaBook className="text-purple-500" /> },
    { id: 4, title: "Editing", icon: <FaEdit className="text-amber-500" /> },
    { id: 5, title: "Literature Review", icon: <FaSearch className="text-red-500" /> },
    { id: 6, title: "Case Studies", icon: <FaFileAlt className="text-pink-500" /> },
    { id: 7, title: "Assignment Help", icon: <FaGraduationCap className="text-teal-500" /> },
    { id: 8, title: "Coursework Help", icon: <FaBook className="text-indigo-500" /> },
    { id: 9, title: "Admission Essays", icon: <FaEdit className="text-yellow-500" /> },
    { id: 10, title: "Plagiarism Check", icon: <FaFileAlt className="text-orange-500" /> },
  ];

  // FAQ data with icons
  const faqs = [
    {
      question: "How quickly can you complete my assignment?",
      answer: "We can complete most assignments within 24-72 hours depending on complexity. Rush services are available for urgent deadlines.",
      icon: <FaClock className="text-blue-500" />
    },
    {
      question: "Are your writers qualified?",
      answer: "Yes, all our writers hold advanced degrees in their respective fields and have proven academic writing experience.",
      icon: <FaGraduationCap className="text-green-500" />
    },
    {
      question: "Is the work plagiarism-free?",
      answer: "Absolutely. We provide a free plagiarism report with every completed assignment to guarantee originality.",
      icon: <FaFileAlt className="text-purple-500" />
    },
    {
      question: "Can I request revisions?",
      answer: "Yes, we offer free revisions within 14 days of delivery to ensure complete satisfaction.",
      icon: <FaEdit className="text-amber-500" />
    },
    {
      question: "How do you ensure confidentiality?",
      answer: "We maintain strict confidentiality and never share your personal information or order details with third parties.",
      icon: <FaUserShield className="text-red-500" />
    }
  ];

  return (
    <div className="bg-gray-50 py-12 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content (2/3 width) */}
          <div className="lg:w-2/3">
            {/* Disciplines Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Academic Disciplines</h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {disciplines.map((discipline, index) => (
                  <li key={discipline.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-start">
                    <span className="text-gray-400 font-medium mr-3">{index + 1}.</span>
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{discipline.icon}</span>
                      <p className="text-gray-800 font-medium">{discipline.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Services Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <li key={service.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-start">
                    <span className="text-gray-400 font-medium mr-3">{index + 1}.</span>
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{service.icon}</span>
                      <p className="text-gray-800 font-medium">{service.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
              <ol className="space-y-4">
                {faqs.map((faq, index) => (
                  <li key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-start">
                      <span className="text-gray-400 font-medium mr-3 mt-1">{index + 1}.</span>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-xl mr-3">{faq.icon}</span>
                          <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                        </div>
                        <p className="text-gray-600 ml-9">{faq.answer}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right Column - Calculator (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-4">
              <div className="flex items-center mb-4">
                <FaCalculator className="text-blue-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Price Calculator</h2>
              </div>
              
              <div className="space-y-4">
                {/* Service Type */}
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-blue-400" />
                    Service Type
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Academic Level */}
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-purple-400" />
                    Academic Level
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                  >
                    <option value="highschool">Highschool ($9/page)</option>
                    <option value="college">College ($9/page)</option>
                    <option value="graduate">Graduate ($15/page)</option>
                    <option value="postgraduate">Postgraduate ($20/page)</option>
                  </select>
                </div>

                {/* Number of Pages */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={pages}
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                {/* Urgent Order */}
                <div className={`p-4 rounded-md border ${isUrgent ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                    />
                    <label className="ml-3 block text-gray-700 flex items-center">
                      <FaClock className="mr-2 text-yellow-500" />
                      <span className="font-bold">Urgent Order</span>
                      <span className="text-yellow-600 font-semibold ml-1">(+$6/page)</span>
                    </label>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-md shadow-sm">
                  <div className="flex flex-col">
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">Price Breakdown</h3>
                      <div className="text-gray-700">
                        <p>
                          <span className="font-medium">{pages} page{pages !== 1 ? 's' : ''}</span> × 
                          <span className="font-medium"> ${baseRate.toFixed(2)} base rate</span>
                          {urgentSurcharge > 0 && (
                            <span className="font-medium"> + ${urgentSurcharge} urgent fee</span>
                          )}
                        </p>
                        {academicLevel && (
                          <p className="text-sm text-gray-600 mt-1">
                            {["graduate", "postgraduate"].includes(academicLevel) 
                              ? "Graduate/PhD level pricing" 
                              : "Highschool/College level pricing"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-600">Estimated Price</p>
                        <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
           
                Place Order 
              </button>

                <p className="text-sm text-gray-500 text-center">
                  Note: This is an estimate only. Final price may vary based on specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;