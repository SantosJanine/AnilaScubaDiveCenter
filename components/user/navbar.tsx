'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from '@heroui/react';
import useSWR from 'swr';

import UserDropdownMenu from './user-dropdown-menu';
import RightSidebar from './right-sidebar';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface UserType {
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);

  const [bannerContent, setBannerContent] = useState('');
  const [bannerColor, setBannerColor] = useState('#ffffff');
  const [bannerVisible, setBannerVisible] = useState(true);

  // Links (removed Sign in)
  // Links (removed Sign in)
const links = [
  { href: '/home/book-your-dive', label: 'BOOK YOUR DIVE', key: 'book-your-dive' },
  { href: '/home/accommodation', label: 'ACCOMMODATION', key: 'accommodation' },
  { href: '/home/about-us', label: 'ABOUT US', key: 'about-us' },
  { href: '/home/contact-us', label: 'CONTACT US', key: 'contact-us' },
  { href: '/home/why-us', label: 'WHY US', key: 'why-us' },
  { href: '/home/shop', label: 'SERVICES', key: 'shop' } // ✅ Added Services
];


  // Determine active link
  const getActiveKey = () => {
    const found = links.find(link => pathname?.startsWith(link.href));
    return found ? found.key : pathname?.startsWith('/account/sign-in') ? 'sign-in' : '';
  };
  const activeButton = getActiveKey();

  // Fetch banner data
  const { data: bannerData } = useSWR('/api/content/banner-1', fetcher);

  // Fetch logged-in user
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;

    fetch(`/api/auth/me?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            first_name: data.user.first_name || '',
            last_name: data.user.last_name || '',
            avatar: data.user.avatar || '',
            email: data.user.email || ''
          });
        }
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  // Update banner content
  useEffect(() => {
    if (bannerData) {
      setBannerContent(bannerData.content || '');
      setBannerColor(bannerData.color || '#ffffff');
      setBannerVisible(bannerData.visibility ?? true);
    }
  }, [bannerData]);

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="absolute z-20 hidden w-full bg-white md:block">
        {/* Banner */}
        <div
          className={`p-2 text-center text-white ${bannerVisible ? 'block' : 'hidden'}`}
          style={{ backgroundColor: bannerColor }}
          dangerouslySetInnerHTML={{ __html: bannerContent }}
        />
        <div className="p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/home" className="flex items-center hover:text-[#047c9e]">
                <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
                <div className="ml-2 mr-8 w-96 text-3xl font-bold text-[#047c9e] whitespace-nowrap truncate">
                  Anilao Scuba Dive Center
                </div>
              </Link>

              {/* Desktop Text Links */}
              <div className="hidden items-center justify-center space-x-8 md:flex">
                {links.map(link => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`uppercase font-normal whitespace-nowrap truncate ${
                      activeButton === link.key ? 'text-[#047c9e]' : 'text-black'
                    } hover:text-[#047c9e]`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right section (Sign in + Cart) */}
            <div className="flex items-center space-x-6">
              {user && user.first_name && user.last_name ? (
                <div className="flex items-center space-x-2">
                  <UserDropdownMenu />
                </div>
              ) : (
                <Link
                  href="/account/sign-in"
                  className={`uppercase font-normal whitespace-nowrap truncate ${
                    activeButton === 'sign-in' ? 'text-[#047c9e]' : 'text-black'
                  } hover:text-[#047c9e]`}
                >
                  SIGN IN
                </Link>
              )}
              <RightSidebar />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar Top */}
      <nav className="fixed top-0 z-20 block h-16 w-full border border-gray-200 bg-white sm:hidden">
        <div className="flex h-full items-center justify-center px-4">
          <Link href="/home" className="flex items-center">
            <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
            <div className="ml-2 text-3xl font-thin text-black whitespace-nowrap truncate">
              ASDC
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
