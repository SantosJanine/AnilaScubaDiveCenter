"use client";

import { useState } from "react";
import FaqModal from "@/components/user/FaqModal";
import Navbar from "@/components/user/navbar";
import Footer from "@/components/user/footer";

export default function FaqPage() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      <FaqModal isOpen={open} onClose={() => setOpen(false)} title="Frequently Asked Questions" />

      <Footer />
    </>
  );
}
