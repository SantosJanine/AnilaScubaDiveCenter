'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

import HeroSection from '@/app/(user)/home/section/hero/hero-section';
import FeaturesSection from "@/app/(user)/home/section/features/features-section";
import AboutSection from "@/app/(user)/home/section/about/about-section";
import WhyChooseSection from "@/app/(user)/home/section/whychoose/whychoose-section";
import ExperienceSection from "@/app/(user)/home/section/experience/experience-section";
import WheretoSection from "@/app/(user)/home/section/whereto/whereto-section";



const Home = () => {
  return (
    // <div className="relative bg-gradient-to-b from-white to-sky-100">
<div className="relative bg-white">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Where to Section */}
      <WheretoSection />
     
    </div>
  );
};

export default Home;



