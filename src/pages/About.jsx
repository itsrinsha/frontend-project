import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 px-4 sm:px-6 md:px-8 py-16">
      
      {/* Paragraph Section - Premium Style */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 hover:shadow-3xl transition-all duration-500 border border-white/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-16 sm:w-20 h-16 sm:h-20 bg-amber-200/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-12 sm:w-16 h-12 sm:h-16 bg-rose-200/30 rounded-full blur-xl"></div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6 text-center relative z-10">
            About Glanzio
          </h1>
          <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed relative z-10">
            <p className="text-gray-800">
              Glanzio is a premium fashion destination, dedicated to bringing you curated styles that combine elegance, quality, and modern trends. Our goal is to empower you to express your style with confidence and sophistication.
            </p>
            <p className="text-gray-800">
              Founded with a passion for fashion and a commitment to excellence, Glanzio has been at the forefront of delivering exceptional clothing and accessories that resonate with today's fashion-conscious individuals.
            </p>
            <p className="text-gray-800">
              We believe that fashion is more than just clothing—it's a form of self-expression, and we're here to provide you with the perfect pieces to tell your unique story.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section - Premium Style */}
      <section className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-12 sm:mb-16">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-white/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">Q</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Quality</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Every product is carefully crafted to meet the highest standards.
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-white/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">I</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Innovation</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We stay ahead with the latest trends and creative designs.
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 border border-white/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">C</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Customer First</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Your satisfaction is our top priority in every experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - Premium Style */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Stay Updated</h2>
          <p className="text-lg sm:text-xl text-amber-100 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest products and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 sm:py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 border-0 shadow-lg"
            />
            <button className="bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
