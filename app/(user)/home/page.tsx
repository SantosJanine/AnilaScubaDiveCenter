'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

import HeroSection from '@/app/(user)/home/section/hero/hero-section';


const Home = () => {
  return (
    // <div className="relative bg-gradient-to-b from-white to-sky-100">
    <div className="relative bg-gradient-to-b from-white to-sky-100">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <HeroSection />
    </div>
  );
};

export default Home;
