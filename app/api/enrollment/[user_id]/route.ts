import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { user_id: string } }) {
  try {
    const user_id = Number(params.user_id);
    if (!user_id) {
      return NextResponse.json({ success: false, message: 'User ID missing', data: [] }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT s.id AS enrollment_id, s.user_id, s.batch_id, 
              b.name AS batch_name, b.start_date, b.end_date,
              p.name AS product_name, p.price
       FROM student s
       JOIN batch b ON s.batch_id = b.id
       JOIN product p ON b.product_id = p.id
       WHERE s.user_id = ?`,
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
