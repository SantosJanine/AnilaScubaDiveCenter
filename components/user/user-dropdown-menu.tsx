'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@heroui/react";
import { Calendar, ChevronDown, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  return { isHovered, handleMouseEnter, handleMouseLeave };
};

interface UserType {
  first_name: string;
  last_name: string;
  email?: string;
}

export default function UserDropdownMenu() {
  const [user, setUser] = useState<UserType | null>(null);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Fetch logged-in user from MySQL via API
  useEffect(() => {
    const email = localStorage.getItem('email'); // email should be set on login
    if (!email) return;

    fetch(`/api/auth/me?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  useEffect(() => {
    if (isHovered) {
      setIsOpen(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered]);

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <Dropdown placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          size="md"
          className="flex cursor-pointer justify-end p-0 mr-4 text-black hover:text-logo-blue"
        >
          {user ? `${user.first_name} ${user.last_name}` : 'Loading...'} <ChevronDown size={16} />
        </Link>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Dropdown menu"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <DropdownItem
          key="profile"
          onClick={() => router.push('/account/profile')}
          endContent={<User size={20} />}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="reservation"
          onClick={() => router.push('/home/my-reservation')}
          endContent={<Calendar size={20} />}
        >
          Reservation
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          endContent={<LogOut size={20} />}
          onPress={handleLogout}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
