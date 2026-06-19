import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-stone-50 py-24 font-sans">
      
      {/* Hero-like About Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-rose-500 font-bold mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-8 tracking-tight">
            Defining Glanzio
          </h1>
          <div className="w-20 h-[1px] bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-stone-200 rounded-sm overflow-hidden relative shadow-2xl shadow-stone-900/10">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
              alt="Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8 text-stone-600 font-light text-lg leading-relaxed">
            <p className="text-stone-900 font-serif text-2xl italic leading-snug">
              "We believe that true elegance is a reflection of self-confidence and timeless style."
            </p>
            <p>
              Liora is a premium fashion destination dedicated to bringing you curated styles
              that combine elegance, quality, and modern trends. Our goal is to empower you to
              express your style with confidence.
            </p>
            <p>
              Founded with a passion for fashion and a commitment to excellence, we focus on
              delivering exceptional clothing and accessories that speak to your personality.
            </p>
            <p>
              We believe fashion is more than clothing—it's a form of self-expression, and we’re
              here to help you tell your story through style.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy/Values */}
      <section className="bg-white py-24 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-stone-900 mb-4">Our Philosophy</h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { title: "Craftsmanship", desc: "Every piece is selected for its superior quality and attention to detail, ensuring timeless durability." },
              { title: "Individuality", desc: "We celebrate the unique style of every woman, offering pieces that inspire confidence and grace." },
              { title: "Sustainability", desc: "Commitment to ethical practices and curated collections that transcend fast-fashion cycles." },
            ].map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-1 h-8 bg-rose-200 group-hover:h-12 group-hover:bg-rose-400 transition-all duration-500 mb-8"></div>
                <h3 className="text-xl font-serif text-stone-900 mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed max-w-xs">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Minimal Redesign */}
      <section className="mt-24 max-w-4xl mx-auto px-4">
        <div className="bg-stone-900 p-12 sm:p-20 rounded-3xl text-center relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-6 relative z-10">
            The Inner Circle
          </h2>

          <p className="text-stone-400 font-light text-base sm:text-lg mb-10 max-w-md mx-auto relative z-10">
            Join our newsletter for exclusive early access to new collections and private styling events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:border-white transition-all duration-300"
            />
            <button className="bg-white text-stone-900 px-8 py-4 rounded-xl font-medium uppercase tracking-widest text-xs hover:bg-rose-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
