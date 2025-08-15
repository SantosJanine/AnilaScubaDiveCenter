'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- important
import { User, Home, BedDouble, ShoppingBag, Ellipsis } from 'lucide-react';
import { Avatar, Button } from '@heroui/react';
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
  const pathname = usePathname(); // get current path
  const [user, setUser] = useState<UserType | null>(null);

  const [bannerContent, setBannerContent] = useState('');
  const [bannerColor, setBannerColor] = useState('#ffffff');
  const [bannerVisible, setBannerVisible] = useState(true);

  // Define links
  const links = [
    { href: '/home', label: 'Home', key: 'home', icon: <Home /> },
    { href: '/home/book-your-dive', label: 'Book Your Dive', key: 'book-your-dive' },
    { href: '/home/shop', label: 'Courses', key: 'shop', icon: <ShoppingBag /> },
    { href: '/home/accommodation', label: 'Accommodation', key: 'accommodation', icon: <BedDouble /> },
    { href: '/home/about-us', label: 'About Us', key: 'about-us' },
    { href: '/home/contact-us', label: 'Contact Us', key: 'contact-us' },
    { href: '/home/why-us', label: 'Why Us', key: 'why-us' },
    { href: '/home/setting', label: 'Settings', key: 'setting', icon: <Ellipsis /> },
  ];

  // Determine active key based on pathname
  const getActiveKey = () => {
    const found = links.find(link => pathname?.startsWith(link.href));
    return found ? found.key : 'home';
  };
  const activeButton = getActiveKey();

  // Fetch banner data
  const { data: bannerData } = useSWR('/api/content/banner-1', fetcher);

  // Fetch logged-in user from MySQL via API
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
              <Link href="/home" className="flex items-center hover:text-blue-500">
                <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
                <div className="ml-2 mr-8 w-96 text-3xl font-bold text-[#047c9e] hover:text-cyan-900">
                  Anilao Scuba Dive Center
                </div>
              </Link>

              {/* Navbar Links */}
              <div className="hidden items-center justify-center space-x-8 md:flex">
                {links
                  .filter(link => !link.icon) // only text links
                  .map(link => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={`font-bold ${
                        activeButton === link.key ? 'text-blue-500' : 'text-black'
                      } hover:text-[#047c9e]`}
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center justify-center">
              {user && user.first_name && user.last_name ? (
                <div className="flex items-center space-x-2">
                  <UserDropdownMenu />
                </div>
              ) : (
                <Link
                  href="/account/sign-in"
                  className="flex w-28 justify-end bg-transparent pr-2 text-black hover:text-blue-500"
                >
                  Sign in&nbsp;&nbsp;<User />
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
            <div className="ml-2 text-3xl font-thin text-black">ASDC</div>
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar Bottom */}
      <nav className="fixed bottom-0 z-20 block h-16 w-full border border-gray-200 bg-white sm:hidden">
        <div className="grid h-full grid-cols-4">
          {links
            .filter(link => link.icon) // only icon links
            .map(link => (
              <Button
                key={link.key}
                as={Link}
                href={link.href}
                radius="none"
                isIconOnly
                variant="light"
                className={`h-full w-full ${activeButton === link.key ? 'text-blue-500' : 'text-gray-600'}`}
              >
                {link.icon}
              </Button>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
