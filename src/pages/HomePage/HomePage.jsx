import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: "iPhone 17 Pro Max",
      tagline: "The future is here. Unbelievably powerful.",
      image: "https://www.apple.com/v/iphone-17-pro/b/images/overview/shared-features/hero_features_middle__calo9u012as2_large_2x.jpg",
      isDark: true
    },
    {
      id: 2,
      name: "MacBook Air M4",
      tagline: "Mind-blowing performance. Game-changing battery life.",
      image: "https://www.apple.com/v/macbook-air/u/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large_2x.jpg",
      isDark: false
    },
    {
      id: 3,
      name: "Apple Watch Ultra 3",
      tagline: "Adventure awaits. Built for extremes.",
      image: "https://www.apple.com/in/apple-watch-ultra-3/images/overview/product-viewer/product_landing__d0d4mw4gk282_large_2x.jpg",
      isDark: true
    },
    {
      id: 4,
      name: "AirPods 4",
      tagline: "Hearing health meets audio excellence.",
      image: "https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge_2x.jpg",
      isDark: false
    }
  ];

  const features = [
    { icon: "⚡", title: "A19 Pro Chip", desc: "Revolutionary performance with 3nm technology" },
    { icon: "📸", title: "Quantum Camera", desc: "200MP Main. 10x Periscope Telephoto." },
    { icon: "🔋", title: "2-Day Battery", desc: "Up to 48 hours video playback" }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://www.apple.com/in/iphone-17-pro/images/overview/highlights/highlights_design_startframe__so62758qssay_large_2x.jpg" 
          alt="iPhone 17 Pro Max"
          className="absolute w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
        
        <div className="relative text-center text-white z-10 px-6">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter">
            iPhone 17 Pro Max
          </h1>
          <p className="text-3xl md:text-4xl text-gray-200 font-light mb-12">
            The future is now
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105">
              Buy Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition transform hover:scale-105">
              Watch the film
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-20">
            Why you'll love it
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-8 bg-white/5 backdrop-blur-xl rounded-3xl hover:scale-105 transition">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      {products.map((product) => (
        <section 
          key={product.id}
          className={`min-h-screen flex items-center justify-center py-20 ${product.isDark ? 'bg-black' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className={`text-sm uppercase tracking-widest font-semibold ${product.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                New
              </span>
              <h2 className={`text-6xl md:text-8xl font-bold my-6 tracking-tighter ${product.isDark ? 'text-white' : 'text-black'}`}>
                {product.name}
              </h2>
              <p className={`text-3xl md:text-4xl font-light ${product.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.tagline}
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-3xl rounded-full"></div>
              <img
                src={product.image}
                alt={product.name}
                className="relative w-full h-auto rounded-3xl group-hover:scale-110 transition duration-700"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-16">
              <button className={`px-10 py-4 rounded-full font-semibold text-lg transition transform hover:scale-105 ${
                product.isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              }`}>
                Learn more
              </button>
              <button className={`px-10 py-4 rounded-full font-semibold text-lg transition transform hover:scale-105 border-2 ${
                product.isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
              }`}>
                Buy
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900">
        <div className="text-center text-white px-6">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
            Innovation
          </h2>
          <p className="text-3xl md:text-4xl text-gray-300 font-light mb-16 max-w-3xl mx-auto">
            That empowers everyone.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse"></div>
            ))}
          </div>
          
          <button className="px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 transition transform hover:scale-110">
            Explore All Products
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-gray-400 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li className="hover:text-white transition cursor-pointer">iPhone</li>
                <li className="hover:text-white transition cursor-pointer">Mac</li>
                <li className="hover:text-white transition cursor-pointer">iPad</li>
                <li className="hover:text-white transition cursor-pointer">Watch</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="hover:text-white transition cursor-pointer">Apple Music</li>
                <li className="hover:text-white transition cursor-pointer">Apple TV+</li>
                <li className="hover:text-white transition cursor-pointer">iCloud</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li className="hover:text-white transition cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition cursor-pointer">Repair</li>
                <li className="hover:text-white transition cursor-pointer">Warranty</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li className="hover:text-white transition cursor-pointer">About</li>
                <li className="hover:text-white transition cursor-pointer">Careers</li>
                <li className="hover:text-white transition cursor-pointer">Events</li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © 2024 Apple Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;