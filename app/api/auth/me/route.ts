export const dynamic = "force-dynamic";

// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req: Request) {
  try {
    // Assuming you have a session cookie or token
    // For simplicity, let's say you pass email as query (replace with real auth later)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) return NextResponse.json({ message: 'Email missing' }, { status: 400 });

   const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, first_name: true, last_name: true, email: true, avatar: true },
    });

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 });
  }
}
