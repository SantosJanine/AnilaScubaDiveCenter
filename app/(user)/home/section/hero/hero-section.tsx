"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, UserCheck, Home, Backpack, Users } from "lucide-react"
import Navbar from "@/components/user/navbar"
import Footer from "@/components/user/footer"
import MyButton from "@/components/MyButton";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
   const router = useRouter();


   const handleClick = () => {
    router.push("/home/book-your-dive") 
  };
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
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero Section (kept as-is) */}
      <div className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden bg-black">
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
          <source src="/img/book-your-dive/DIVING.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        

        {/* Dark overlay */}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Heading with left-right curtain effect */}
          <motion.h1
            className="text-5xl font-bold mb-6 drop-shadow-lg overflow-hidden text-white"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {"Welcome to Anilao Scuba Dive Center".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { x: idx % 2 === 0 ? -50 : 50, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 },
                  },
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Paragraph with left-right curtain effect */}
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto overflow-hidden text-white"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.03, delayChildren: 1 } },
            }}
          >
            {"Experience world-class diving in the heart of the Philippines".split("").map(
              (letter, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { x: idx % 2 === 0 ? -30 : 30, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 },
                    },
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              )
            )}
          </motion.p>

           {/* ✅ MyButton overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-6"
          >
            <MyButton label="Book Now" onClick={handleClick} />
          </motion.div>
        </div>
      </div>

   
     
        <div
          ref={sectionRef}
          className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8 z-10"
        >
        

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
          </motion.div>
        </div>
    </>
  )
}
