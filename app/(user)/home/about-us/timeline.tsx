'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineModal from './TimelineModal';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  moreInfo?: string;
}

const timelineEvents: TimelineEvent[] = [
  { 
    year: 1995, 
    title: 'Founding', 
    description: 'Anilao Scuba Dive Center was founded with the vision of creating a premier hub for divers seeking to explore the rich marine biodiversity of Anilao.', 
    moreInfo: 'Back in 1995, a group of passionate divers came together with a shared dream of introducing more people to the underwater treasures of Batangas. What started as a small dive shop with limited resources gradually grew into a trusted name in the diving community. From the very beginning, our mission was to promote both world-class diving experiences and sustainable tourism practices that would protect the reefs for generations to come.' 
  },
  { 
    year: 2000, 
    title: 'PADI 5 Star Certification', 
    description: 'Achieved PADI 5 Star Dive Center recognition, a milestone that highlighted our commitment to superior training standards, safety, and diver education.', 
    moreInfo: 'By 2000, Anilao Scuba Dive Center had already built a reputation for professionalism and quality service. The PADI 5 Star certification placed us among the top dive centers worldwide, validating our efforts to provide excellent scuba training, eco-friendly diving practices, and customer-centered experiences. This recognition reassured divers that we uphold the highest international standards, making us a trusted choice for beginners and professionals alike.' 
  },
  { 
    year: 2010, 
    title: 'Eco-Initiative Launch', 
    description: 'Launched our first large-scale marine conservation program, focusing on reef restoration, coral planting, and diver education on environmental stewardship.', 
    moreInfo: 'With the increasing pressures on marine ecosystems, we recognized our responsibility to act as stewards of the ocean. In 2010, we partnered with local communities, marine biologists, and NGOs to establish coral nurseries, conduct reef cleanups, and provide eco-diving courses. Our eco-initiative not only raised awareness among divers but also contributed directly to the rehabilitation of degraded reefs, ensuring that the beauty of Anilao’s marine life would be preserved for future generations.' 
  },
  { 
    year: 2015, 
    title: 'Facility Expansion', 
    description: 'Expanded our facilities to provide divers with state-of-the-art amenities, including modern training pools, upgraded classrooms, and advanced equipment.', 
    moreInfo: 'The expansion in 2015 marked a major step in elevating the overall diving experience. Our new training pool was designed to give beginners a safe, controlled environment to practice essential skills before venturing into open water. We also upgraded our gear, classrooms, and accommodations, ensuring both comfort and safety. This investment reflected our ongoing commitment to providing the best possible environment for divers at every stage of their journey.' 
  },
  { 
    year: 2020, 
    title: 'Virtual Diving Program', 
    description: 'Launched our innovative virtual diving and e-learning courses, enabling students to start their scuba education from the safety of their homes.', 
    moreInfo: 'When the COVID-19 pandemic brought global travel to a halt, we sought new ways to connect with our community. In 2020, we introduced virtual classrooms, interactive workshops, and live sessions with instructors, allowing aspiring divers to continue learning even while at home. This program not only kept the diving spirit alive during challenging times but also expanded our reach to international students who might not have had the chance to travel to Anilao before.' 
  },
];


const HorizontalTimeline: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.2 },
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="justify-left container flex w-full overflow-x-auto py-16 lg:justify-center">
        <div className="relative inline-flex" ref={timelineRef}>
          {/* Horizontal line */}
          <motion.div
            className="absolute left-0 right-0 top-2 h-0.5 bg-blue-200"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1 }}
          />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative mx-8 flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => setSelectedEvent(event)} // 👈 trigger modal
            >
              <div className="z-10 mb-2 h-4 w-4 rounded-full bg-logo-blue hover:scale-110 transition-transform" />
              <span className="mb-2 font-bold text-logo-blue">{event.year}</span>
              <div className="w-48 text-center">
                <h4 className="mb-2 text-lg font-semibold">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reusable Modal */}
      {selectedEvent && (
        <TimelineModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          year={selectedEvent.year}
          title={selectedEvent.title}
          description={selectedEvent.description}
          moreInfo={selectedEvent.moreInfo}
        />
      )}
    </>
  );
};

export default HorizontalTimeline;
