"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function FaqModal({ isOpen, onClose, title }: ModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need prior diving experience to join a dive at ASDC?",
      answer:
        "No experience? No problem! ASDC offers introductory dive programs for beginners, including Discover Scuba Diving experiences. If you are new to diving, our PADI-certified instructors will guide you step by step to ensure a safe and enjoyable dive.",
    },
    {
      question: "What dive certifications do you offer?",
      answer:
        "We offer a range of PADI certification courses, from Open Water Diver for beginners to Advanced Open Water, Rescue Diver, and even Divemaster training for those looking to go pro. Specialty courses like Underwater Photography, Nitrox Diving, and Deep Diving are also available.",
    },
    {
      question: "What marine life can I expect to see in Anilao?",
      answer:
        "Anilao is known as the nudibranch capital of the world and is home to a diverse marine ecosystem. You can expect to see colorful coral reefs, sea turtles, reef sharks, frogfish, pygmy seahorses, ghost pipefish, and various macro critters—making it a paradise for divers and underwater photographers!",
    },
    {
      question: "What should I bring for my dive trip?",
      answer:
        "If you have your own gear, feel free to bring it! Otherwise, we provide high-quality rental equipment. Essentials to bring include swimwear, sunscreen (reef-safe), a towel, and a dry bag for personal belongings. If you are staying overnight, pack accordingly for your trip.",
    },
    {
      question: "How do I book a dive with ASDC?",
      answer:
        "Booking is easy! You can contact us via our website, social media, or email to check availability and reserve your spot. We recommend booking in advance, especially during peak diving seasons, to ensure we can accommodate your preferred schedule.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-3xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Optional title */}
        {title && <h3 className="text-2xl font-semibold text-logo-blue mb-4">{title}</h3>}

        {/* FAQ content */}
        <div className="max-w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-3 text-gray-700 text-justify"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
