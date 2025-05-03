import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        {/* Hero Image at the top */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            src="/graduation.avif" 
            alt="Students studying together"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to AcademicHelp</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your trusted partner for academic writing and research assistance.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Academic Tools Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Essential Academic Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* Microsoft Word */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fab fa-microsoft text-4xl text-blue-600 mb-3"></i>
            <h3 className="font-medium">Microsoft Word</h3>
          </div>
          
          {/* PowerPoint */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-file-powerpoint text-4xl text-orange-600 mb-3"></i>
            <h3 className="font-medium">PowerPoint</h3>
          </div>
          
          {/* Excel */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-file-excel text-4xl text-green-600 mb-3"></i>
            <h3 className="font-medium">Excel</h3>
          </div>
          
          {/* Grammarly */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-spell-check text-4xl text-green-500 mb-3"></i>
            <h3 className="font-medium">Grammarly</h3>
          </div>
          
          {/* Turnitin */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-search text-4xl text-blue-500 mb-3"></i>
            <h3 className="font-medium">Turnitin</h3>
          </div>
          
          {/* Google Scholar */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-graduation-cap text-4xl text-blue-400 mb-3"></i>
            <h3 className="font-medium">Google Scholar</h3>
          </div>
          
          {/* Google Books */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-book text-4xl text-red-500 mb-3"></i>
            <h3 className="font-medium">Google Books</h3>
          </div>
          
          {/* SPSS */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-chart-bar text-4xl text-indigo-600 mb-3"></i>
            <h3 className="font-medium">SPSS</h3>
          </div>
          
          {/* RStudio */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-chart-line text-4xl text-blue-700 mb-3"></i>
            <h3 className="font-medium">RStudio</h3>
          </div>
          
          {/* Stata */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-table text-4xl text-purple-600 mb-3"></i>
            <h3 className="font-medium">Stata</h3>
          </div>
          
          {/* Mendeley */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-book-open text-4xl text-teal-600 mb-3"></i>
            <h3 className="font-medium">Mendeley</h3>
          </div>
          
          {/* Zotero */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <i className="fas fa-file-export text-4xl text-gray-700 mb-3"></i>
            <h3 className="font-medium">Zotero</h3>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reason 1: Expert Writers */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-graduate text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Expert Writers</h3>
            <p className="text-gray-600">
              Our team of professional writers ensures high-quality, plagiarism-free content tailored to your needs.
            </p>
          </div>

          {/* Reason 2: 24/7 Support */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-headset text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Get round-the-clock support for all your academic needs. We're always here to help!
            </p>
          </div>

          {/* Reason 3: Affordable Pricing */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-wallet text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Affordable Pricing</h3>
            <p className="text-gray-600">
              We offer competitive pricing to fit your budget without compromising on quality.
            </p>
          </div>

          {/* Reason 4: On-Time Delivery */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-clock text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
            <p className="text-gray-600">
              We guarantee timely delivery of all assignments, so you never miss a deadline.
            </p>
          </div>

          {/* Reason 5: Plagiarism*/}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-book-open text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">No plagiarism policy</h3>
            <p className="text-gray-600">
              We have a zero tolerence for plagiarism.
            </p>
          </div>

          {/* Reason 6: Money-Back Guarantee */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-hand-holding-usd text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Money-Back Guarantee</h3>
            <p className="text-gray-600">
              If you're not satisfied with our work, we offer a money-back guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-users text-3xl"></i>
              </div>
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p className="text-xl">Happy Students</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-file-alt text-3xl"></i>
              </div>
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-xl">Papers Delivered</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-award text-3xl"></i>
              </div>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-xl">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <i className="fas fa-user-circle text-6xl text-green-600"></i>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "AcademicHelp has been a lifesaver! The quality is exceptional, and they always deliver on time."
                </p>
                <p className="font-semibold">– Sarah T.</p>
                <p className="text-sm text-gray-500">Biology Student</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <i className="fas fa-user-circle text-6xl text-green-600"></i>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "I highly recommend AcademicHelp. Their support team is amazing!"
                </p>
                <p className="font-semibold">– John D.</p>
                <p className="text-sm text-gray-500">Engineering Student</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <i className="fas fa-user-circle text-6xl text-green-600"></i>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The writers helped me achieve an A on my research paper!"
                </p>
                <p className="font-semibold">– Emily R.</p>
                <p className="text-sm text-gray-500">Literature Student</p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <i className="fas fa-user-circle text-6xl text-green-600"></i>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Submitted my thesis on time and with confidence. Highly recommended!"
                </p>
                <p className="font-semibold">– Michael S.</p>
                <p className="text-sm text-gray-500">PhD Candidate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved academic success with AcademicHelp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up Now
            </a>
            <a
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;