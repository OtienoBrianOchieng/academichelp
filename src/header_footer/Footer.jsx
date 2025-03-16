import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              AcademicHelp is your trusted partner for academic writing and research
              assistance. We provide high-quality, plagiarism-free content to help you
              achieve your academic goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-green-500 transition duration-300">
                  Home
                </a>
              </li>

              <li>
                <a href="/services" className="text-gray-400 hover:text-green-500 transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-green-500 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@academichelp.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Academic St, Edu City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-green-500 transition duration-300"
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-green-500 transition duration-300"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-green-500 transition duration-300"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-green-500 transition duration-300"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AcademicHelp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;