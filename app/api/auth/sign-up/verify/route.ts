// src/app/api/auth/sign-up/verify/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ message: 'Email query missing' }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { is_verified: true },
    });

    // Redirect user to sign-in page with verified query
    return NextResponse.redirect(`${DOMAIN}/account/sign-in?verified=1`);
  } catch (error: any) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
