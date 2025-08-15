import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user_id, batch_id } = await request.json();

    if (!user_id || !batch_id) {
      return NextResponse.json({ success: false, message: 'Missing user_id or batch_id' }, { status: 400 });
    }

    // Insert student enrollment
    await pool.execute(
      `INSERT INTO student (user_id, batch_id) VALUES (?, ?)`,
      [user_id, batch_id]
    );

    return NextResponse.json({ success: true, message: 'Enrollment successful' }, { status: 201 });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { success: false, message: 'Database error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
