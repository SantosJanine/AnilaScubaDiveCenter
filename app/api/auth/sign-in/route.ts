// src/app/api/auth/sign-in/route.ts
export const dynamic = "force-dynamic";
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    if (!user.is_verified) {
      return NextResponse.json({ message: 'Account not verified' }, { status: 401 });
    }

    // 🔑 Adjust depending on your DB
    // If passwords are plain text in phpMyAdmin:
    // const isValid = user.password === password;

    // If hashed with bcrypt:
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json(
      {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        is_admin: user.is_admin,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
