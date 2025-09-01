"use client"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function WheretoSection() {
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

  const resorts = [
    {
      title: "Aiyanar Beach and Dive Resort",
      description: "Affordable beachfront resort with diving facilities.",
      image: "/img/book-your-dive/aiyanar.jpg",
    },
    {
      title: "Sea's Spring Resort",
      description: "Relax and enjoy the serene seaside atmosphere.",
      image: "/img/book-your-dive/seaspring.jpg",
    },
    {
      title: "Vivere Resort",
      description: "Comfortable stay with scenic views.",
      image: "/img/book-your-dive/vivere.jpg",
    },
    {
      title: "Altamare Resort",
      description: "Modern amenities with easy beach access.",
      image: "/img/book-your-dive/Altamare.jpg",
    },
    {
      title: "Paradiso Rito Resort",
      description: "Peaceful getaway with cozy rooms.",
      image: "/img/book-your-dive/Paradiso.jpg",
    },
    {
      title: "Buceo Resort",
      description: "Perfect for diving enthusiasts.",
      image: "/img/book-your-dive/BUCEO.jpg",
    },
  ]

  return (
    <section ref={sectionRef} className="container mx-auto px-4 mt-24 mb-24">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center text-logo-blue mb-10 tracking-wide relative z-10"
      >
        Best and Affordable Beach Resorts in Anilao, Batangas
      </motion.h2>

      {/* Section Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-gray-700 max-w-3xl mx-auto mb-12"
      >
        Anilao Batangas is a popular tourist destination known for its beautiful
        beaches and diving spots. Various accommodation options are available to
        tourists, ranging from luxurious resorts to affordable hotels.
      </motion.p>

      {/* Resort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resorts.map(({ title, description, image }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
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
    </section>
  )
}
