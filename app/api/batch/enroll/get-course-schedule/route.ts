export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const course_id = searchParams.get('id');

    if (!course_id) {
      return NextResponse.json({ success: false, batch: [] });
    }

    const [rows] = await pool.query(
      'SELECT * FROM batch WHERE product_id = ? ORDER BY start_date ASC',
      [course_id]
    );

    return NextResponse.json({ success: true, batch: rows });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ success: false, batch: [] }, { status: 500 });
  }
}
