import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-16">
      
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mb-4">
          About Glanzio
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Glanzio is a premium fashion destination, dedicated to bringing you curated styles that combine elegance, quality, and modern trends. Our goal is to empower you to express your style with confidence and sophistication.
        </p>
      </section>

      
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To create a fashion experience that blends elegance, sustainability, and affordability, empowering our customers to express themselves.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Our Vision</h2>
          <p className="text-gray-700">
            To become a globally recognized brand known for premium quality, innovative designs, and exceptional customer experiences.
          </p>
        </div>
      </section>

    
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-[#111827] mb-2">Quality</h3>
            <p className="text-gray-700">
              Every product is carefully crafted to meet the highest standards.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-[#111827] mb-2">Innovation</h3>
            <p className="text-gray-700">
              We stay ahead with the latest trends and creative designs.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-[#111827] mb-2">Customer First</h3>
            <p className="text-gray-700">
              Your satisfaction is our top priority in every experience.
            </p>
          </div>
        </div>
      </section>
       <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Glanzio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with premium services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders above ₹999</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure and encrypted payments</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest products and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-amber-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
