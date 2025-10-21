import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaShippingFast, FaShieldAlt, FaHeadset, FaAward } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative py-20 px-4 sm:px-6 text-white text-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="https://www.videvo.net/videvo_files/converted/2017_05/preview/170429_A_052.mp451571.webm" 
            type="video/webm" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-amber-400/10"></div>
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-white/3 to-transparent rounded-full animate-pulse-slower"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-200">Glanzio</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-95 animate-fade-in-up animation-delay-200">
            Discover premium products curated for your lifestyle
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white/95 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl animate-fade-in-up animation-delay-400 backdrop-blur-sm"
          >
            Shop Now 
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500">Glanzio</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShippingFast, title: "Free Shipping", desc: "Free delivery on orders over $50" },
              { icon: FaShieldAlt, title: "Secure Payment", desc: "100% secure payment processing" },
              { icon: FaHeadset, title: "24/7 Support", desc: "Round-the-clock customer service" },
              { icon: FaAward, title: "Quality Guarantee", desc: "30-day money back guarantee" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white"
              >
                <div className="relative inline-block mb-6">
                  <feature.icon className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 opacity-5 rounded-full blur-lg group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Product Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our signature piece that embodies elegance and modern style
            </p>
          </div>

          {/* Featured Product Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Visual */}
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Elegant Summer Dress"
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-float">
                  <span className="text-sm font-semibold text-gray-800">New Arrival</span>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute -z-10 top-4 -left-4 w-24 h-24 bg-gradient-to-r from-amber-200 to-pink-200 rounded-full blur-xl opacity-60 animate-pulse-slow"></div>
              <div className="absolute -z-10 bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-rose-200 to-orange-200 rounded-full blur-xl opacity-40 animate-pulse-slower"></div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-sm font-semibold rounded-full mb-4">
                  Summer Collection
                </span>
                <h3 className="text-4xl font-bold text-gray-800 mb-4">
                  Serenity Maxi Dress
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Experience effortless elegance with our flowing maxi dress featuring delicate embroidery and sustainable fabric that moves with you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Made from organic bamboo fabric</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Hand-embroidered details</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Available in 8 seasonal colors</span>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-800">$89.99</span>
                  <span className="text-lg text-gray-500 line-through">$129.99</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    30% OFF
                  </span>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Explore This Collection
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our curated collections across different categories
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Womens */}
            <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img 
                  src="https://i.pinimg.com/736x/84/d1/36/84d1369973b42d441d88c5b304ee5c1d.jpg"
                  alt="Womens"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Womens</h3>
                  <p className="text-white/90">Latest collections</p>
                </div>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group">
                Explore Women Fashion
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>

            {/* Fashion */}
            <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Fashion"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Fashion</h3>
                  <p className="text-white/90">Trendy styles</p>
                </div>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group">
                Explore Fashion
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>

            {/* Kids */}
            <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img 
                  src="https://i.pinimg.com/736x/50/6b/12/506b12cd57603c24839b74890b7fb119.jpg"
                  alt="Kids"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Kids</h3>
                  <p className="text-white/90">Adorable outfits</p>
                </div>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group">
                Explore Kids Fashion
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover your perfect style today
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-gray-800 px-10 py-4 rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm"
          >
            Browse All Products
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;