'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Divider } from '@heroui/react';
import { Phone, Mail, Globe, Facebook } from 'lucide-react';
import FaqModal from '@/components/user/FaqModal';

// TikTok Icon as SVG
const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    width="16"
    height="16"
    {...props}
  >
    <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128c70.7 0 128-57.3 128-128V94.7h-36.7c0 45-36.3 81.3-81.3 81.3S57.7 139.7 57.7 94.7c0-45 36.3-81.3 81.3-81.3V0z" />
  </svg>
);

const Footer: React.FC = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <footer className="relative bg-gradient-to-b from-[#047C9E] to-[#3CAFD3] text-white">
      <div className="py-12 mx-auto max-w-screen-2xl px-4">
        {/* Divider */}
        <Divider className="border-white/30" />

        <div className="md:flex md:justify-between mt-6">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center pb-1">
              <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
              <span className="ml-2 text-2xl font-semibold text-white">
                Anilao Scuba Dive Center
              </span>
            </Link>
            <p className="text-white/90 mt-2 text-sm">
              ASDC is the ideal place for divers and people who wish to experience the underwater world.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Resources */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white">
                Resources
              </h2>
              <ul className="space-y-2 text-sm">
                <li><Link href="/home" className="hover:underline">Home</Link></li>
                <li><Link href="/home/shop" className="hover:underline">Courses</Link></li>
                <li><Link href="/home/accommodation" className="hover:underline">Accomodation</Link></li>
                <li><Link href="/testimonials" className="hover:underline">Testimonials</Link></li>
                <li>
                  <button onClick={() => setIsFaqOpen(true)} className="hover:underline text-left p-0">
                    Faq
                  </button>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white">
                Follow us
              </h2>
              <ul className="space-y-2 text-sm flex flex-col gap-1">
                <li className="flex items-center gap-2">
                  <Facebook size={16} />
                  <a href="https://www.facebook.com/AnilaoScubaDiveCenter" className="hover:underline">Facebook</a>
                </li>
                <li className="flex items-center gap-2">
                  <TikTokIcon />
                  <a href="https://www.tiktok.com/@ginafaith05" className="hover:underline">TikTok</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-white">
                Contact
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Phone className="mr-2 text-white" size={16} />
                  <span>+63 905 435 2513</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 text-white" size={16} />
                  <a href="mailto:fgbaoin@yahoo.com" className="hover:underline text-white">
                    fgbaoin@yahoo.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Globe className="mr-2 text-white" size={16} />
                  <a href="https://asdc-coral.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline text-white">
                    asdc-coral.vercel.app
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-4 border-white/30 sm:mx-auto" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white/90 sm:text-center">
            © 2024 Infinitech Advertisiong Corporation™. All Rights Reserved.
          </span>
        </div>
      </div>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <FaqModal
          isOpen={isFaqOpen}
          onClose={() => setIsFaqOpen(false)}
          title="Frequently Asked Questions"
        />
      )}
    </footer>
  );
};

export default Footer;
