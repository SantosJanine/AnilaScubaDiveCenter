'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Avatar,
  Input,
  Button,
  CardHeader,
  Card,
  CardBody,
} from "@heroui/react";
import { upload } from '@vercel/blob/client';
import { Eye, User, MailIcon, EyeOff, Upload, CircleX, CircleCheck, AlertCircle } from 'lucide-react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string(), // optional
});

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
}

export function ProfileCard() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user
  useEffect(() => {
    const email = localStorage.getItem('email'); 
    if (!email) return;

    fetch(`/api/auth/me?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.user && typeof data.user.id === 'number') {
          setUser({
            id: data.user.id,
            first_name: data.user.first_name || '',
            last_name: data.user.last_name || '',
            email: data.user.email || '',
            password: '', // do not fetch password
            avatar: data.user.avatar || ''
          });
        } else {
          setError('Failed to fetch user information.');
        }
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setError('Failed to fetch user information.');
      });
  }, []);

  const handleAvatarClick = () => inputFileRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setUser(prev => prev ? { ...prev, avatar: e.target?.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    if (!user || !user.id) {
      setError('User ID is missing. Please try again.');
      setSubmitting(false);
      return;
    }

    setSuccess('');
    setError('');
    setLoading(true);

    try {
      let avatarUrl = user.avatar;

      if (avatarFile) {
        const uploadedBlob = await upload(
          `user/avatar/${avatarFile.name}`,
          avatarFile,
          {
            access: 'public',
            handleUploadUrl: '/api/vercel/upload',
          }
        );
        avatarUrl = uploadedBlob.url;
      }

      const payload: any = {
        id: user.id,
        avatar: avatarUrl,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      };

      if (values.password) payload.password = values.password;

      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || 'Failed to update profile');
      }

      setUser(prev => prev ? { ...prev, ...values, avatar: avatarUrl } : null);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while updating the profile');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Card className="w-96 p-6 md:w-[500px]" style={{ maxWidth: '90vw' }}>
      <CardHeader>
        {success && (
          <div className="flex w-full items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-800" role="alert">
            <CircleCheck size={20} /> {success}
          </div>
        )}
        {error && (
          <div className="flex w-full items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
            <CircleX size={20} /> {error}
          </div>
        )}
      </CardHeader>

      <CardBody>
        <div className="flex w-full items-center justify-center gap-x-4">
          <Avatar
            src={user.avatar}
            className="h-24 w-24 cursor-pointer text-large"
            onClick={handleAvatarClick}
          />
          <Button
            size="sm"
            variant="light"
            endContent={<Upload className="h-4 w-4" />}
            onClick={handleAvatarClick}
            className="text-primary"
          >
            Upload Avatar
          </Button>
          <input type="file" accept="image/*" ref={inputFileRef} className="hidden" onChange={handleFileChange} />
        </div>

        <Formik
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-y-1">
              <Field as={Input} label="First name" name="first_name" variant="underlined" isRequired endContent={<User size={22} className="text-primary" />} />
              <ErrorMessage name="first_name" render={msg => <ErrorMessageComponent>{msg}</ErrorMessageComponent>} />

              <Field as={Input} label="Last name" name="last_name" variant="underlined" isRequired endContent={<User size={22} className="text-primary" />} />
              <ErrorMessage name="last_name" render={msg => <ErrorMessageComponent>{msg}</ErrorMessageComponent>} />

              <Field as={Input} type="email" label="Email" name="email" variant="underlined" isRequired endContent={<MailIcon size={20} className="text-primary" />} />
              <ErrorMessage name="email" render={msg => <ErrorMessageComponent>{msg}</ErrorMessageComponent>} />

              <Field as={Input} type={isVisible ? 'text' : 'password'} label="Password" name="password" variant="underlined"
                endContent={
                  <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                    {isVisible ? <Eye size={22} className="text-primary" /> : <EyeOff size={22} className="text-primary" />}
                  </button>
                }
              />
              <ErrorMessage name="password" render={msg => <ErrorMessageComponent>{msg}</ErrorMessageComponent>} />

              <Button type="submit" color="primary" isLoading={isSubmitting} isDisabled={isSubmitting}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}

const ErrorMessageComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
    <AlertCircle size={16} />
    <span>{children}</span>
  </div>
);
