import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaShippingFast, FaShieldAlt, FaHeadset, FaAward } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image (Luxury fashion) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Fashion" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-stone-900/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h2 className="text-sm md:text-base tracking-[0.3em] text-white/90 uppercase mb-4 animate-fade-in-up">
            New Collection 2026
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Elegance <br className="md:hidden" /> Redefined
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light animate-fade-in-up" style={{animationDelay: '200ms'}}>
            Discover pieces that blend timeless sophistication with modern design. Elevate your everyday wardrobe.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-widest text-stone-900 bg-white hover:bg-stone-100 transition-colors duration-300 min-w-[200px] animate-fade-in-up" style={{animationDelay: '300ms'}}
          >
            <span>Shop Collection</span>
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Curated Edits</h2>
          <div className="w-16 h-[1px] bg-stone-400"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Dresses", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Accessories", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
          ].map((cat, idx) => (
            <div key={idx} className="group relative h-[600px] overflow-hidden cursor-pointer" onClick={() => navigate("/products")}>
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
                <h3 className="text-2xl font-serif text-white mb-2">{cat.title}</h3>
                <span className="text-xs uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Product Split Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* Image */}
            <div className="relative h-[700px]">
              <img 
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Signature Collection"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text */}
            <div className="p-12 lg:p-24 bg-stone-50 h-full flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-rose-600 mb-6 block">The Signature Piece</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-6 leading-tight">
                Silk Evening Gown
              </h2>
              <p className="text-stone-600 leading-relaxed mb-10 font-light text-lg">
                Experience unparalleled luxury with our handcrafted silk evening gown. Designed to drape elegantly, it features a timeless silhouette that captures the essence of modern femininity.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-serif text-stone-900">$295</span>
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-3 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-rose-600 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Features Section */}
      <section className="py-24 px-4 sm:px-8 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: FaShippingFast, title: "Complimentary Shipping", desc: "On all orders over $200" },
              { icon: FaAward, title: "Artisan Quality", desc: "Crafted with premium materials" },
              { icon: FaShieldAlt, title: "Secure Checkout", desc: "Your data is perfectly safe" },
              { icon: FaHeadset, title: "Concierge Service", desc: "24/7 personal styling advice" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <feature.icon className="text-3xl text-stone-400 mb-6" />
                <h3 className="text-lg font-serif text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-stone-500 font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-4 bg-stone-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Join The Insider</h2>
          <p className="text-stone-400 mb-10 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-transparent border border-stone-600 text-white placeholder-stone-500 focus:outline-none focus:border-white transition-colors"
            />
            <button className="px-8 py-3 bg-white text-stone-900 text-sm uppercase tracking-widest hover:bg-rose-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;