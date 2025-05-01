import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image */}
      <div className="bg-green-800 text-white">
        {/* Hero Image at the top */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            src= "/graduation.avif" 
            alt="Students studying together"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Welcome to AcademicHelp</h1>
          <p className="text-xl mb-8">
            Your trusted partner for academic writing and research assistance.
          </p>
          <a
            href="/signup"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reason 1: Expert Writers */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-user-graduate text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">Expert Writers</h3>
            <p className="text-gray-600">
              Our team of professional writers ensures high-quality, plagiarism-free content tailored to your needs.
            </p>
          </div>

          {/* Reason 2: 24/7 Support */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-headset text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Get round-the-clock support for all your academic needs. We're always here to help!
            </p>
          </div>

          {/* Reason 3: Affordable Pricing */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-wallet text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">Affordable Pricing</h3>
            <p className="text-gray-600">
              We offer competitive pricing to fit your budget without compromising on quality.
            </p>
          </div>

          {/* Reason 4: On-Time Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-clock text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
            <p className="text-gray-600">
              We guarantee timely delivery of all assignments, so you never miss a deadline.
            </p>
          </div>

          {/* Reason 5: Wide Range of Disciplines */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-book-open text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">Wide Range of Disciplines</h3>
            <p className="text-gray-600">
              From English to Programming, we cover a vast array of academic disciplines.
            </p>
          </div>

          {/* Reason 6: Money-Back Guarantee */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <i className="fas fa-hand-holding-usd text-5xl text-green-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-4">Money-Back Guarantee</h3>
            <p className="text-gray-600">
              If you're not satisfied with our work, we offer a money-back guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <i className="fas fa-users text-5xl mb-4"></i>
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p className="text-xl">Happy Students</p>
            </div>
            <div className="text-center">
              <i className="fas fa-file-alt text-5xl mb-4"></i>
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-xl">Papers Delivered</p>
            </div>
            <div className="text-center">
              <i className="fas fa-award text-5xl mb-4"></i>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-xl">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-user-circle text-6xl text-green-600 mb-4"></i>
              <p className="text-gray-600 mb-4">
                "AcademicHelp has been a lifesaver for me! The quality of their work is
                exceptional, and they always deliver on time."
              </p>
              <p className="font-semibold">– Sarah T.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-user-circle text-6xl text-green-600 mb-4"></i>
              <p className="text-gray-600 mb-4">
                "I highly recommend AcademicHelp to anyone struggling with academic writing.
                Their support team is amazing!"
              </p>
              <p className="font-semibold">– John D.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-user-circle text-6xl text-green-600 mb-4"></i>
              <p className="text-gray-600 mb-4">
                "The writers at AcademicHelp are incredibly knowledgeable. They helped me
                achieve an A on my research paper!"
              </p>
              <p className="font-semibold">– Emily R.</p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-user-circle text-6xl text-green-600 mb-4"></i>
              <p className="text-gray-600 mb-4">
                "Thanks to AcademicHelp, I was able to submit my thesis on time and with
                confidence. Highly recommended!"
              </p>
              <p className="font-semibold">– Michael S.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of students who have achieved academic success with AcademicHelp.
          </p>
          <a
            href="/signup"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;