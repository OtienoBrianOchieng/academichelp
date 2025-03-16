import React, { useState } from "react";

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [expandedDiscipline, setExpandedDiscipline] = useState(null);

  const disciplines = [
    {
      id: 1,
      title: "English 101",
      brief: "Master the fundamentals of English language and literature.",
      details:
        "Our experts can help you with grammar, essay writing, literary analysis, and more. Perfect for students at all levels.",
    },
    {
      id: 2,
      title: "Business Studies",
      brief: "Explore the world of business and management.",
      details:
        "Get assistance with case studies, business plans, financial analysis, and other business-related topics.",
    },
    {
      id: 3,
      title: "Management",
      brief: "Learn the principles of effective management.",
      details:
        "We provide support for management theories, organizational behavior, project management, and more.",
    },
    {
      id: 4,
      title: "History",
      brief: "Dive into the past with expert guidance.",
      details:
        "Our historians can help you with research papers, historical analysis, and understanding complex historical events.",
    },
    {
      id: 5,
      title: "Nursing",
      brief: "Excel in your nursing studies and practice.",
      details:
        "We offer assistance with nursing theories, case studies, patient care plans, and more.",
    },
    {
      id: 6,
      title: "Psychology",
      brief: "Understand the human mind and behavior.",
      details:
        "Our experts can help you with psychological theories, research papers, and case studies.",
    },
    {
      id: 7,
      title: "Health Care",
      brief: "Explore the complexities of health care systems.",
      details:
        "We provide support for health care policies, research papers, and case studies.",
    },
    {
      id: 8,
      title: "Economics",
      brief: "Master economic theories and applications.",
      details:
        "Get assistance with microeconomics, macroeconomics, econometrics, and more.",
    },
    {
      id: 9,
      title: "Education",
      brief: "Learn the principles of teaching and learning.",
      details:
        "We offer support for lesson planning, educational theories, and research in education.",
    },
    {
      id: 10,
      title: "Marketing",
      brief: "Explore the world of marketing and advertising.",
      details:
        "Our experts can help you with marketing strategies, case studies, and research papers.",
    },
    {
      id: 11,
      title: "Communications",
      brief: "Master the art of effective communication.",
      details:
        "We provide assistance with public speaking, media studies, and communication theories.",
    },
    {
      id: 12,
      title: "Political Science",
      brief: "Understand political systems and theories.",
      details:
        "Our experts can help you with political analysis, research papers, and case studies.",
    },
    {
      id: 13,
      title: "Introduction to Programming (Python and JavaScript)",
      brief: "Learn the basics of Python and JavaScript programming.",
      details:
        "Our programming experts can help you with coding assignments, debugging, and understanding programming concepts.",
    },
    {
      id: 14,
      title: "AI Humanization",
      brief: "Explore the ethical and practical aspects of AI humanization.",
      details:
        "We provide support for research papers, case studies, and projects related to AI ethics and humanization.",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Essay Writing",
      brief: "Professional essay writing services for all academic levels.",
      details:
        "Our expert writers can help you with argumentative essays, descriptive essays, narrative essays, and more. We ensure high-quality, plagiarism-free content tailored to your requirements.",
    },
    {
      id: 2,
      title: "Research Paper Writing",
      brief: "Comprehensive research paper assistance from topic selection to final draft.",
      details:
        "We provide support for all types of research papers, including qualitative and quantitative research. Our writers are experienced in various citation styles like APA, MLA, and Chicago.",
    },
    {
      id: 3,
      title: "Thesis and Dissertation Writing",
      brief: "End-to-end thesis and dissertation writing services.",
      details:
        "From proposal writing to final editing, we help you at every stage of your thesis or dissertation. Our team ensures your work meets academic standards and is delivered on time.",
    },
    {
      id: 4,
      title: "Editing and Proofreading",
      brief: "Polishing your work to perfection.",
      details:
        "Our editors review your work for grammar, punctuation, clarity, and coherence. We also check for proper citation and formatting to ensure your work is publication-ready.",
    },
    {
      id: 5,
      title: "Literature Review",
      brief: "Expert assistance in compiling and analyzing literature reviews.",
      details:
        "We help you identify relevant sources, summarize key findings, and synthesize information to create a comprehensive literature review for your research.",
    },
    {
      id: 6,
      title: "Case Study Writing",
      brief: "Detailed case study analysis and writing.",
      details:
        "Our writers can help you analyze real-life scenarios, apply theoretical concepts, and present your findings in a structured and professional manner.",
    },
    {
      id: 7,
      title: "Assignment Help",
      brief: "Assistance with all types of academic assignments.",
      details:
        "Whether it's a math problem, a programming task, or a business report, our experts are here to help you complete your assignments on time and with high quality.",
    },
    {
      id: 8,
      title: "Coursework Help",
      brief: "Comprehensive support for all coursework requirements.",
      details:
        "We provide assistance with essays, reports, presentations, and other coursework components to help you achieve top grades.",
    },
    {
      id: 9,
      title: "Admission Essay Writing",
      brief: "Crafting compelling admission essays for college and university applications.",
      details:
        "Our writers help you showcase your strengths, achievements, and aspirations in a way that stands out to admission committees.",
    },
    {
      id: 10,
      title: "Plagiarism Check",
      brief: "Ensuring your work is 100% original.",
      details:
        "We use advanced plagiarism detection tools to scan your work and provide a detailed report. We also offer suggestions to eliminate any unintentional plagiarism.",
    },
  ];

  const toggleDetails = (id, type) => {
    if (type === "service") {
      setExpandedService((prev) => (prev === id ? null : id));
    } else if (type === "discipline") {
      setExpandedDiscipline((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Disciplines Section */}
        <h2 className="text-3xl font-bold text-center mb-12">Disciplines We Have</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disciplines.map((discipline) => (
            <div
              key={discipline.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">{discipline.title}</h3>
                <p className="text-gray-600 mb-4">{discipline.brief}</p>
              </div>
              {expandedDiscipline === discipline.id && (
                <div className="text-left">
                  <p className="text-gray-600 mb-4">{discipline.details}</p>
                </div>
              )}
              <div className="text-left">
                <button
                  onClick={() => toggleDetails(discipline.id, "discipline")}
                  className="text-green-600 hover:text-green-700 font-semibold focus:outline-none"
                >
                  {expandedDiscipline === discipline.id ? "Show less" : "Click for more"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <h2 className="text-3xl font-bold text-center mt-16 mb-12">Our Academic Writing Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.brief}</p>
              </div>
              {expandedService === service.id && (
                <div className="text-left">
                  <p className="text-gray-600 mb-4">{service.details}</p>
                </div>
              )}
              <div className="text-left">
                <button
                  onClick={() => toggleDetails(service.id, "service")}
                  className="text-green-600 hover:text-green-700 font-semibold focus:outline-none"
                >
                  {expandedService === service.id ? "Show less" : "Click for more"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;