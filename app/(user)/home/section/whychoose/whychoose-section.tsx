'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, UserCheck, Home, Backpack } from "lucide-react";

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#047C9E] to-[#3CAFD3] py-24"
    >
      <div className="relative container mx-auto px-4 mt-10 mb-10">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-white mb-10 tracking-wide relative z-10"
        >
          Why Choose Anilao Scuba Dive Center (ASDC)?
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="relative z-5 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {[
            {
              icon: <CheckCircle className="text-white" size={24} />,
              title: "Affordable Diving Excellence",
              description:
                "Experience the thrill of exploring vibrant underwater worlds without breaking the bank. Our diving packages are thoughtfully designed to provide top-tier experiences at competitive prices, making quality diving accessible to both beginners and seasoned enthusiasts. Whether it’s a day trip or a multi-day adventure, we ensure every dive is memorable and worth your investment.",
            },
            {
              icon: <UserCheck className="text-white" size={24} />,
              title: "Expert Dive Guides",
              description:
                "Our team of certified instructors and experienced dive masters are passionate about sharing their knowledge and ensuring your safety throughout every dive. From personalized guidance to insider tips about local marine life and hidden spots, they elevate your diving experience, helping you discover the underwater world with confidence and ease.",
            },
            {
              icon: <Home className="text-white" size={24} />,
              title: "Comfortable Accommodations",
              description:
                "After an adventurous day beneath the waves, retreat to our comfortable and thoughtfully designed accommodations. Each room is air-conditioned and furnished with modern amenities, including cozy bedding, spacious layouts, and reliable Wi-Fi. We aim to create a relaxing environment where guests can unwind, recharge, and enjoy a peaceful stay close to the diving sites.",
            },
            {
              icon: <Backpack className="text-white" size={24} />,
              title: "Inclusive Services",
              description:
                "We go the extra mile to make your stay effortless and enjoyable. Guests benefit from complimentary services such as snorkeling gear, high-speed Wi-Fi, and private parking, along with personalized support from our staff. By including these conveniences, we ensure your focus remains on exploring, relaxing, and creating lasting memories rather than worrying about logistics.",
            },
          ].map(({ icon, title, description }, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, type: "spring", stiffness: 120 },
                },
              }}
              className="flex flex-col items-start text-left p-6 rounded-lg 
                         hover:scale-105 transition-all duration-300 bg-white/10 gap-4"
            >
              {/* Icon + Title */}
              <div className="flex items-center mb-3 gap-2">
                <span>{icon}</span>
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white text-sm leading-relaxed text-justify">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
