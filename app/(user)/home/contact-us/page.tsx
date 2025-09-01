'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea } from "@heroui/react";
import { toast } from 'react-hot-toast';
import { MailIcon, UserIcon, MessageSquareIcon } from 'lucide-react';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !name.trim() || !message.trim()) {
      toast.error('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const formData = { email, name, message };

      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit the form.');

      setEmail('');
      setName('');
      setMessage('');
      toast.success('Message sent! We’ll be in touch shortly.');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D9EAFD] via-white to-[#BFDFFF] py-20 px-4 sm:px-6 lg:px-8 lg:pt-32">
      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg p-8 w-full max-w-xl">
            <h3 className="text-3xl font-bold mb-6 text-primary">Contact Information</h3>

            <Input
              type="email"
              label="Email"
              variant="underlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter valid email address"
              className="mb-4"
              endContent={<MailIcon size={20} className="text-primary" />}
            />

            <Input
              type="text"
              label="Name"
              variant="underlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mb-4"
              endContent={<UserIcon size={20} className="text-primary" />}
            />

            <Textarea
              label="Message"
              variant="underlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="mb-4"
              minRows={4}
              endContent={<MessageSquareIcon size={20} className="text-primary" />}
            />

            <Button
              onClick={handleSubmit}
              color="primary"
              radius="none"
              isLoading={loading}
              className="w-full"
            >
              Submit
            </Button>
          </div>

          {/* Map */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg w-full max-w-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8322326.0038581565!2d119.17598925434736!3d11.715114400946069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd077b8b552011%3A0xa86ffeaf3163988!2sAnilao%20Scuba%20Dive%20Center%20ASDC!5e0!3m2!1sen!2sph!4v1732005634936!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ minHeight: '460px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Google Maps Embed for Anilao Scuba Dive Center ASDC"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
