import TestimonialSlider from "@/components/user/testimonial-slider";
import Navbar from '@/components/user/navbar';
import Footer from "@/components/user/footer";

export default function Testimonial() {
  return (
    <>
        <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        <Navbar />
        </div>

      {/* Other sections... */}
      <TestimonialSlider />

       <Footer />
    </>
  );
}
