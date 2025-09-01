"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Map, Camera, Leaf, Star } from "lucide-react";

const features = [
  {
    title: "World-Class Instructors",
    description:
      "Learn from certified, highly experienced dive instructors who make every dive safe, fun, and educational. They provide personalized guidance, insider tips, and ensure that divers of all skill levels feel confident and supported during every dive.",
    icon: Users,
  },
  {
    title: "Safe & Reliable Equipment",
    description:
      "All diving gear is regularly inspected and meticulously maintained to ensure peace of mind beneath the waves. We prioritize your safety, providing top-quality wetsuits, regulators, BCDs, and tanks, so every dive is smooth, secure, and enjoyable.",
    icon: ShieldCheck,
  },
  {
    title: "Breathtaking Dive Sites",
    description:
      "Explore vibrant coral reefs, rich marine biodiversity, and crystal-clear waters that Anilao is famous for. Each dive site offers unique experiences for beginners and seasoned divers, creating unforgettable underwater adventures.",
    icon: Map,
  },
  {
    title: "Personalized Dive Experience",
    description:
      "Whether you are a beginner, advanced diver, or underwater photographer, we customize each dive to your goals. Our team tailors dive plans to match your skill level and interests, ensuring every excursion is engaging, safe, and memorable.",
    icon: Star,
  },
  {
    title: "Eco-Friendly Practices",
    description:
      "We promote reef-safe diving and sustainable tourism to protect Anilao’s natural beauty for future generations. Our staff educates divers on environmental responsibility, encouraging minimal impact practices while exploring the underwater world.",
    icon: Leaf,
  },
];

export default function FeaturesSection() {
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
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-white mb-10 tracking-wide relative z-10"
        >
          Our Features
        </motion.h2>

        {/* Features Grid */}
        <motion.div
          className="relative z-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {features.map(({ title, description, icon: Icon }, idx) => (
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
              {/* Title with icon beside it */}
              <div className="flex items-center mb-3 gap-2">
                <span className="text-white"><Icon size={24} /></span>
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
