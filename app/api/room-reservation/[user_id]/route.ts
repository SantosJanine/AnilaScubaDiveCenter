export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export async function GET(req: Request, { params }: { params: { user_id: string } }) {
  try {
    const user_id = Number(params.user_id);
    if (!user_id) {
      return NextResponse.json({ success: false, message: 'User ID missing', data: [] }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT * FROM booking WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database error',
        error: error instanceof Error ? error.message : 'Unknown error',
        data: [],
      },
      { status: 500 }
    );
  }
}
