"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import { CheckCircle, UserCheck, Home, Backpack, Users } from "lucide-react"
import Navbar from "@/components/user/navbar"
import Footer from "@/components/user/footer"


export default function LandingPage() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden">
        {/* Background Video */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <source src="/img/book-your-dive/scuba.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 drop-shadow-lg"
          >
            Welcome to Anilao Scuba Dive Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-8 max-w-2xl mx-auto drop-shadow-md"
          >
            Experience world-class diving in the heart of the Philippines
          </motion.p>
        </div>
      </div>

      {/* About Section with Background Design */}
      <div className="relative overflow-hidden py-16">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Wave SVG */}
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
        </div>

        {/* Foreground Content */}
        <div
          ref={sectionRef}
          className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8 z-10"
        >
          <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="h-[400px] md:h-[500px] rounded-lg shadow-lg bg-cover bg-center"
  style={{
    backgroundImage: "url('/img/book-your-dive/best-anilao-beach-resorts-feature-1140x759.jpg')"
  }}
></motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-logo-blue dark:text-blue-100 mb-4">
              About Anilao Scuba Dive Center
            </h2>
           <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
  Anilao is one of the greatest treasures of Batangas Province. Located in the municipality of Mabini, this coastal town faces Balayan Bay, which is part of the Verde Island Passage, considered the “global center of marine biodiversity.” It is home to various marine species, as well as different kinds of corals. With over 40 dive sites, it is visited by scuba divers from all over the world. Some of the popular dive sites include Sombrero Island, Maricaban Island, Mapating, and The Cathedral, which is said be to the best-known Philippine dive site. Other notable ones are Mainit Point, Eagle Point, Arthur’s Rock, Devil’s Point, Beatrice Rocks, and Twin Rocks.

  That saying, this coastal paradise is not just for scuba divers. Located just 2.5-3 hours away from Manila, Anilao is also popular among casual tourists especially during summer and weekends. Pockets of white-sand beach and pebble beaches make it a decent option for swimming. Moreover, it offers activities such as island hopping which everyone can enjoy.
</p>

           
          </motion.div>
        </div>
      </div>
      {/* Background Wrapper */}
      <div className="relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Subtle wave pattern overlay */}
      <svg className="absolute bottom-0 left-0 w-full h-40 text-blue-200 dark:text-gray-700" preserveAspectRatio="none" viewBox="0 0 1440 320">
      <path fill="currentColor" fillOpacity="0.3" d="M0,256L48,245.3C96,235,192,213,288,197.3C384,181,480,171,576,192C672,213,768,267,864,277.3C960,288,1056,256,1152,229.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>

  {/* Content */}
  <div className="relative z-10">

    {/* Why Choose ASDC Section */}
    <div className="container mx-auto px-4 mt-24 mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center bg-gradient-to-r from-logo-blue to-logo-green bg-clip-text text-transparent mb-10 tracking-wide"
      >
        Why Choose Anilao Scuba Dive Center (ASDC)?
      </motion.h2>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {[
          {
            icon: <CheckCircle className="mt-1 text-logo-blue" size={80} />,
            title: "Affordable Diving Excellence:",
            description:
              "Experience top-tier diving at competitive prices, making quality accessible to all enthusiasts."
          },
          {
            icon: <UserCheck className="mt-1 text-logo-blue" size={80} />,
            title: "Expert Dive Guides:",
            description:
              "Our seasoned instructors and dive masters ensure safety and enrich your diving experience with local knowledge."
          },
          {
            icon: <Home className="mt-1 text-logo-blue" size={80} />,
            title: "Comfortable Accommodations:",
            description:
              "Enjoy air-conditioned rooms equipped with modern amenities, providing a restful retreat after your dives."
          },
          {
            icon: <Backpack className="mt-1 text-logo-blue" size={80} />,
            title: "Inclusive Services:",
            description:
              "Benefit from free snorkeling gear, Wi-Fi, and private parking, enhancing your overall stay."
          },
          {
            icon: <Users className="mt-1 text-logo-blue" size={80} />,
            title: "Community Engagement:",
            description:
              "Join a community of marine biology students and enthusiasts, fostering enriching discussions and shared experiences."
          },
          {
            icon: <CheckCircle className="mt-1 text-logo-blue" size={80} />,
            title: "Eco-Friendly Practices:",
            description:
              "We follow sustainable diving practices to protect marine life and preserve Anilao’s underwater beauty for future generations."
          }
        ].map(({ icon, title, description }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 * idx }}
            className="flex items-start space-x-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 hover:shadow-logo-green/40 transition duration-300"
          >
            {icon}
            <p className="text-gray-800 dark:text-gray-300 text-lg m-0">
              <strong className="text-xl font-semibold mb-3 text-logo-blue">
                {title}
              </strong>{" "}
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Things to Do Section */}
    <div className="container mx-auto px-4 mt-24 mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-logo-blue to-logo-green bg-clip-text text-transparent mb-8 tracking-wide"
      >
        Featured Experiences in Anilao, Batangas
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12"
      >
        Anilao is more than just a diving paradise. From island-hopping and snorkeling to hiking
        scenic trails and enjoying local delicacies, there’s something for every kind of traveler.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Scuba Diving",
            description: "Anilao is known for its excellent scuba diving and snorkeling spots.",
            image: "/img/book-your-dive/83051472_presentation-wide_normal_none-1.jpg"
          },
          {
            title: "Island Hopping",
            description:
              "Island hopping is a great way to explore the beautiful beaches and islands around Anilao.",
            image: "/img/book-your-dive/124078761_presentation-wide_normal_none.jpg"
          },
          {
            title: "Excursions",
            description:
              "Anilao is also a great base for excursions to nearby attractions like Taal Lake and Taal Volcano.",
            image: "/img/book-your-dive/125024826_presentation_normal_none.jpg"
          }
        ].map(({ title, description, image }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-logo-green/40 duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-logo-blue">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
            <img
              src={image}
              alt={title}
              className="mt-4 w-full h-48 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>

    {/* Where to Stay Section */}
    <div className="container mx-auto px-4 mt-24 mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center text-logo-blue dark:text-blue-100 mb-8"
      >
        Where to Stay in Anilao Batangas
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12"
      >
        Anilao Batangas is a popular tourist destination known for its beautiful beaches and diving spots.
        Various accommodation options are available to tourists, ranging from luxurious resorts to affordable hotels.
      </motion.p>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {[
            {
              title: "Aiyanar Beach and Dive Resort",
              desc: "Located in Barangay Bagalangit, Mabini, Batangas, offering amenities like an outdoor pool, spa, and restaurant.",
              img: "/img/book-your-dive/85520729_presentation-wide_normal_none.jpg"
            },
            {
              title: "Sea’s Spring Resort",
              desc: "Located in Barangay Bagalangit, Mabini, Batangas, offering an outdoor pool, restaurant, and bar.",
              img: "/img/book-your-dive/sea.jpg"
            },
            {
              title: "Vivere Azure",
              desc: "A luxurious beachfront resort in Barangay Aguada, San Teodoro Anilao, Mabini, Batangas.",
              img: "/img/book-your-dive/The-Pool.jpg"
            }
          ].map(({ title, desc, img }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg text-center hover:scale-105 hover:shadow-2xl hover:shadow-logo-green/40 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-logo-blue">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
              <img
                src={img}
                alt={title}
                className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  </div>
</div>

   
    </>
  )
}
