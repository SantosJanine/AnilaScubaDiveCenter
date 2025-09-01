"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mark Rivera",
    role: "Certified Diver",
    review:
      "Anilao Scuba Dive Center gave me the best diving experience! The instructors are very professional and the dive spots are breathtaking.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Sofia Cruz",
    role: "Beginner Diver",
    review:
      "I was nervous at first, but the team made me feel safe and comfortable. I can’t wait to dive with them again!",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "David Santos",
    role: "Adventure Enthusiast",
    review:
      "Amazing service, top-quality equipment, and unforgettable dives. Highly recommended for anyone visiting Anilao!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <>
      <section className="pt-32 pb-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          {/* Section Header */}
          <h2 className="text-4xl font-extrabold text-logo-blue mb-4 tracking-tight">
            Testimonials
          </h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">
            Hear what our divers have to say about their unforgettable
            experiences with us.
          </p>

          {/* Slider */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-xl rounded-3xl p-10 relative border border-gray-100"
              >
                {/* Quote Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-logo-blue text-white p-4 rounded-full shadow-lg">
                  <Quote className="w-6 h-6" />
                </div>

                {/* Review */}
                <p className="text-lg text-gray-700 italic mb-8 leading-relaxed">
                  “{testimonials[index].review}”
                </p>

                {/* User Info */}
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-logo-blue shadow-md"
                  />
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonials[index].name}
                    </h4>
                    <p className="text-sm text-logo-blue font-medium">
                      {testimonials[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevSlide}
                className="px-5 py-2 rounded-full bg-logo-blue text-white font-medium shadow-md hover:bg-logo-blue/90 transition"
              >
                ⬅ Prev
              </button>
              <button
                onClick={nextSlide}
                className="px-5 py-2 rounded-full bg-logo-blue text-white font-medium shadow-md hover:bg-logo-blue/90 transition"
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Bubbles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-logo-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-logo-blue/10 rounded-full blur-3xl"></div>
      </section>

     
     
    </>
  );
}
