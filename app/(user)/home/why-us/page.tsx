'use client';

import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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

const WhyChooseUs: React.FC = () => {
  const router = useRouter();
  const [isInView, setIsInView] = useState(true); // Always true for testing
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      router.push('/home/book-your-dive');
    } else {
      router.push('/account/sign-in-required');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Decorative Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 text-blue-200 dark:text-gray-700"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="0.3"
          d="M0,256L48,245.3C96,235,192,213,288,197.3C384,181,480,171,576,192C672,213,768,267,864,277.3C960,288,1056,256,1152,229.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="relative container mx-auto px-4 z-10">
        <h2 className="mt-12 mb-12 text-center text-4xl font-bold text-logo-blue">
          Why Choose Anilao Scuba Dive Center?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 shadow-lg transition-shadow duration-300 hover:shadow-xl backdrop-blur-md">
                  <CardHeader className="flex gap-3 p-5">
                    <Icon className="h-10 w-10 rounded-full bg-blue-100 p-2 dark:bg-blue-900" />
                    <h3 className="text-xl font-semibold text-logo-blue">{reason.title}</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="p-5">
                    <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-24 text-center"
        >
          <h3 className="mb-2 text-2xl font-semibold text-logo-blue">
            Ready to Dive In?
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Join us for an underwater adventure you&apos;ll never forget. Book your dive today and experience the magic of Anilao&apos;s marine life.
          </p>
          <Button
            onClick={handleClick}
            size="lg"
            variant="solid"
            className="font-semibold bg-logo-blue text-white"
          >
            Book Your Dive
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
