import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('id');

    if (!batchId) {
      return NextResponse.json({ success: false, message: 'Missing batch ID' }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT user_id FROM student WHERE batch_id = ?`,
      [batchId]
    );

    return NextResponse.json({ success: true, students: rows });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { success: false, message: 'Database error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
