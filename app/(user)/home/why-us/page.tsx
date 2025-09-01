'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AnchorIcon,
  AwardIcon,
  HeartHandshakeIcon,
  MapIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react';

const reasons = [
  {
    icon: AwardIcon,
    title: 'Expert Instructors',
    description:
      'Our team of PADI-certified instructors brings years of experience and passion to every dive.',
  },
  {
    icon: MapIcon,
    title: 'Prime Location',
    description:
      'Situated in the heart of Anilao, we offer easy access to the best dive sites in the Philippines.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety First',
    description:
      'We prioritize your safety with top-notch equipment and strict adherence to diving protocols.',
  },
  {
    icon: UsersIcon,
    title: 'Small Groups',
    description:
      'We keep our dive groups small to ensure personalized attention and a better learning experience.',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Eco-Friendly Practices',
    description:
      "We're committed to preserving the marine ecosystem through responsible diving practices.",
  },
  {
    icon: AnchorIcon,
    title: 'Modern Facilities',
    description:
      'Our dive center is equipped with the latest gear and comfortable amenities for your convenience.',
  },
];

export default function WhyChooseUs() {
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
      className="relative overflow-hidden bg-gradient-to-b from-[#D9EAFD] via-white to-[#BFDFFF] pt-40 pb-24"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-logo-blue mb-12 tracking-wide"
        >
          Why Choose Anilao Scuba Dive Center?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {reasons.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, type: 'spring', stiffness: 120 },
                },
              }}
              className="flex flex-col items-start p-6 
                         border-2 border-logo-blue/70 rounded-lg 
                         hover:border-logo-blue hover:scale-105 
                         transition-all duration-300 bg-transparent gap-4"
            >
              <div className="flex items-center mb-3 gap-2">
                <span className="text-logo-blue"><Icon size={24} /></span>
                <h3 className="text-lg font-semibold text-logo-blue">{title}</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
