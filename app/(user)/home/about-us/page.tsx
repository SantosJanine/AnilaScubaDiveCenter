"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardBody, Image } from "@heroui/react"
import { motion } from "framer-motion"
import { EyeIcon, FlagIcon, StarIcon } from "lucide-react"
import HorizontalTimeline from "./timeline"
import Navbar from '@/components/user/navbar';

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.disconnect()
    }
  }, [])

  const vmgData = [
    {
      title: "Vision",
      icon: <EyeIcon className="h-10 w-10 text-logo-blue" />,
      content:
        "To be the premier scuba diving destination in the Philippines, recognized globally for excellence in diving education, marine conservation, and sustainable tourism practices.",
    },
    {
      title: "Mission",
      icon: <FlagIcon className="h-10 w-10 text-logo-blue" />,
      content:
        "To provide world-class diving experiences while promoting marine conservation, offering professional training, and fostering a deep appreciation for ocean life through safe and sustainable diving practices.",
    },
    {
      title: "Goals",
      icon: <StarIcon className="h-10 w-10 text-logo-blue" />,
      content:
        "To achieve excellence in diving education, promote marine conservation, and create unforgettable underwater experiences for our guests while maintaining the highest safety standards.",
    },
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      
      {/* Navbar at Top */}
<div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
  <Navbar />
</div>

{/* Spacer para hindi matabunan ng Navbar */}
<div className="h-24"></div>


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

      <div ref={sectionRef} className="relative container mx-auto px-4 z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-logo-blue dark:text-blue-100 mb-4">
            Discover Anilao Scuba Dive Center
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Dive into the vibrant underwater world and explore the beauty of the Philippines
          </p>
        </motion.div>

        {/* Image + About */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/img/hero-section/d1.jpg"
              alt="Scuba diving in Anilao"
              width={1000}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md min-h-[400px]">
              <CardBody>
                <h3 className="text-2xl font-semibold text-logo-blue dark:text-blue-100 mb-4">
                  Our Passion for the Ocean
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                  At <strong>Anilao Scuba Diving</strong>, our love for the ocean goes beyond just diving—it’s about sharing the beauty and serenity of the underwater world with everyone. We believe that each dive is a chance to discover something new, from vibrant coral gardens to rare marine creatures. Our <strong>PADI-certified instructors</strong> are dedicated to providing safe, enjoyable, and informative experiences for divers of all skill levels.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                  Whether you’re taking your first breath underwater or aiming for advanced certifications, we guide you every step of the way. Safety, education, and adventure are at the heart of every dive we offer. We also take pride in promoting marine conservation and respect for the delicate ecosystems we explore. Through guided dives and training, we encourage divers to appreciate and protect the ocean’s wonders.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                  Our facilities and equipment are maintained to the highest standards, ensuring both comfort and security during your dives. Every experience with us is designed to be unforgettable, leaving you with memories that last a lifetime. <strong>Join us at Anilao Scuba Diving, and let the ocean’s magic inspire you.</strong>
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Vision, Mission, Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-logo-blue dark:text-blue-100 mb-12">
            Our Vision, Mission & Goals
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {vmgData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * idx }}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-shadow duration-300">
                  <CardBody className="text-center p-6">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h4 className="text-xl font-semibold text-logo-blue dark:text-blue-100 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <HorizontalTimeline />
      </div>
    </div>
  )
}
