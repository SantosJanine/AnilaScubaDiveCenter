
"use client";

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion";

export default function AboutSection() {
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
    return () => observer.disconnect()
  }, [])
  
  return (
    <section className="py-16 bg-white">
        {/* About Section (white) */}
      <div className="relative overflow-hidden py-16 bg-white">
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
              backgroundImage: "url('/img/hero-section/anilao.jpg')",
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-logo-blue mb-4">
              About Anilao Scuba Dive Center
            </h2>
            <p className="text-gray-700 mb-4 text-justify">
              Anilao is one of the greatest treasures of Batangas Province. Located in the
              municipality of Mabini, this coastal town faces Balayan Bay, which is part of the
              Verde Island Passage, considered the “global center of marine biodiversity.” It is
              home to various marine species, as well as different kinds of corals. With over 40
              dive sites, it is visited by scuba divers from all over the world. Some of the popular
              dive sites include Sombrero Island, Maricaban Island, Mapating, and The Cathedral,
              which is said be to the best-known Philippine dive site. Other notable ones are Mainit
              Point, Eagle Point, Arthur’s Rock, Devil’s Point, Beatrice Rocks, and Twin Rocks.
              <br />
              <br />
              That saying, this coastal paradise is not just for scuba divers. Located just 2.5-3
              hours away from Manila, Anilao is also popular among casual tourists especially during
              summer and weekends. Pockets of white-sand beach and pebble beaches make it a decent
              option for swimming. Moreover, it offers activities such as island hopping which
              everyone can enjoy.
            </p>
          </motion.div>
        </div>
      </div>

    </section>


  );
}