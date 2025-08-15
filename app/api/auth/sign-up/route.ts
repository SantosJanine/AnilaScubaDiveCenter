// src/app/api/auth/sign-up/route.ts
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';
import { render } from '@react-email/render';
import { SignupConfirmationEmail } from '@/emails/signup-confirmation-email';
import nodemailer from 'nodemailer';

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// POST: Create a new user
export async function POST(req: Request) {
  try {
    const { email, first_name, last_name, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashedPassword,
        avatar: 'https://banner2.cleanpng.com/20180622/tqt/aazen4lhc.webp',
        is_verified: false,
        is_archived: false,
      },
    });

    // Send verification email if Gmail credentials are available
    if (process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD, // Use App Password if 2FA is enabled
        },
      });

      // Construct verification link
      const verificationLink = `${DOMAIN}/api/auth/sign-up/verify?email=${encodeURIComponent(email)}`;

      // Render email template with link
      const emailHtml = await render(
        SignupConfirmationEmail({ first_name, last_name, email, verificationLink })
      );

      // Send email
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Verify your ASDC account',
        html: emailHtml,
      });

      console.log(`Verification email sent to: ${email}`);
    }

    return NextResponse.json({ message: 'Success', user }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH: Verify user email
export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ message: 'Email query missing' }, { status: 400 });
    }

    // Update user as verified
    await prisma.user.update({
      where: { email },
      data: { is_verified: true },
    });

    // Optionally redirect to sign-in page with query
    return NextResponse.redirect(`${DOMAIN}/account/sign-in?verified=1`);
  } catch (error: any) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// GET: Optional, prevent 405
export async function GET() {
  return NextResponse.json({ message: 'Use POST to sign up a user' });
}
