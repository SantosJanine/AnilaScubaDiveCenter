import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function PUT(request: Request) {
  try {
    const { id, avatar, first_name, last_name, email, password } = await request.json();

    if (!id) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) }, // ensure id is a number
      data: {
        avatar,
        first_name,
        last_name,
        email,
        ...(password ? { password } : {}), // only update password if provided
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (err: any) {
    console.error('Update user error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
