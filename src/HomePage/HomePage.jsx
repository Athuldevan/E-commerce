import { useState } from "react";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      title: "Precision Crafted",
      subtitle: "Swiss Made Excellence",
      cta: "Explore Movements",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Where Elegance Meets Function",
      subtitle: "Shop Premium Watches Now.",
      cta: "Shop Now",
    },
  ];

  const collections = [
    {
      name: "Classic Series",
      image:
        "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      description: "Timeless designs for every occasion",
    },
    {
      name: "Diver Series",
      image:
        "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      description: "Built for adventure and endurance",
    },
    {
      name: "Chronograph Series",
      image:
        "https://images.unsplash.com/photo-1456444029056-7dfaeeb83a19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMHdhdGNofGVufDB8fDB8fHww",
      description: "Precision timing meets modern aesthetics",
    },
  ];

  const testimonials = [
    {
      quote:
        "As someone who’s picky about design, I was thrilled to find a watch that’s both stylish AND comfortable for all-day wear. The ordering process was seamless, and delivery was lightning-fast. Will definitely be back for my next one!",
      author: "James Wilson, Collector",
    },
    {
      quote:
        "I've never received so many compliments on a timepiece. The finishing is exquisite.",
      author: "Sarah Chen, Fashion Editor",
    },
  ];

  return (
    <div className="text-gray-900">
      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={heroSlides[currentSlide]?.image}
          alt="Luxury Watch"
          className="w-full h-full object-cover object-center transition-opacity duration-1000"
        />
        <div className="absolute inset-0 flex items-center z-20 px-8 sm:px-16 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              {heroSlides[currentSlide].subtitle}
            </p>
            <button className="bg-transparent border-2 border-amber-400 text-amber-400 px-8 py-3 hover:bg-amber-400 hover:text-black transition-all duration-300 flex items-center">
              {heroSlides[currentSlide].cta}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full ${
                currentSlide === index ? "bg-amber-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee Brands */}
      <div className="py-12 bg-gray-100 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          {[
            "ROLEX",
            "PATEK PHILIPPE",
            "AUDEMARS PIGUET",
            "VACHERON CONSTANTIN",
            "JAEGER-LECOULTRE",
            "OMEGA",
          ].map((brand) => (
            <span
              key={brand}
              className="text-2xl font-light mx-12 inline-block opacity-70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <section className="py-20 px-8 sm:px-16 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Curated Collections
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Each timepiece is a testament to horological artistry, blending
            tradition with innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group relative overflow-hidden h-96">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-medium mb-1">{collection.name}</h3>
                <p className="mb-4">{collection.description}</p>
                <button className="flex items-center text-sm font-medium">
                  View Collection <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-8 sm:px-16 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light mb-6">
              The Art of Horology
            </h2>
            <p className="text-gray-600 mb-6">
              Elevate your style with our exquisite collection of premium
              watches. From sleek minimalist designs to bold statement pieces,
              each timepiece is crafted for precision, durability, and timeless
              elegance. Whether you're dressing up or keeping it casual, find
              the perfect watch to match your vibe. Shop now and make every
              second count!"
            </p>
            <p className="text-gray-600 mb-8">
              Our watches are more than timekeeping instruments—they're
              heirlooms in the making, designed to be passed down through
              generations while maintaining their impeccable accuracy and
              beauty.
            </p>
            <button className="border-b border-black pb-1 font-medium">
              Discover Our Craft
            </button>
          </div>
          <div className="relative h-96 lg:h-[500px]">
            <img
              src="https://media.istockphoto.com/id/2123185822/photo/a-man-checking-a-wristwatch-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=UeVYsLiWLA-OFOJEPqCtAN5ZYt2Snk6akpo5l9UYJIA="
              alt="Watchmaking"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-lg w-3/4">
              <h3 className="text-xl font-medium mb-2">
                Swiss Made Excellence
              </h3>
              <p className="text-gray-600 text-sm">
                Every movement certified by the COSC, ensuring chronometric
                precision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 sm:px-16 lg:px-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-12">
            Collector's Voices
          </h2>
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative">
                <svg
                  className="w-12 h-12 mx-auto text-amber-400 mb-6 opacity-30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl sm:text-2xl font-light italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-amber-400">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 sm:px-16 lg:px-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Begin Your Horological Journey
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of collectors and receive exclusive access to
            limited editions, private events, and expert watchmaking insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-400 text-black px-8 py-4 hover:bg-amber-300 transition-colors">
              Browse Collections
            </button>
            <button className="border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
