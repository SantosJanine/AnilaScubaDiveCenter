"use client"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function WhyChooseSection() {
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

  const experiences = [
    {
      title: "Scuba Diving",
      description: "Anilao is known for its excellent scuba diving and snorkeling spots.",
      image: "/img/book-your-dive/83051472_presentation-wide_normal_none-1.jpg",
    },
    {
      title: "Island Hopping",
      description: "Island hopping is a great way to explore the beautiful beaches and islands around Anilao.",
      image: "/img/book-your-dive/islandhopping.jpg",
    },
    {
      title: "Excursions",
      description: "Anilao is also a great base for excursions to nearby attractions like Taal Lake and Taal Volcano.",
      image: "/img/book-your-dive/125024826_presentation_normal_none.jpg",
    },
  ]

  return (
    <div ref={sectionRef} className="container mx-auto px-4 mt-24 mb-24">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center text-logo-blue mb-10 tracking-wide relative z-10"
      >
        Featured Experience in Anilao, Batangas
      </motion.h2>

      {/* Section Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-700 max-w-3xl mx-auto mb-12"
      >
        Anilao is more than just a diving paradise. From island-hopping and snorkeling to hiking
        scenic trails and enjoying local delicacies, there’s something for every kind of traveler.
      </motion.p>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiences.map(({ title, description, image }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.3 }}
            className="flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105 h-full"
          >
            {/* Taller Image */}
            <div className="w-full h-96 overflow-hidden">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and description */}
            <div className="p-4 text-center flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2 text-logo-blue">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
