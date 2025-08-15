import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { user_id, name, email, date, time, participant, level, message } = await req.json();

    // Validate required fields
    if (!user_id || !name || !email || !date || !time || !participant || !level || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const numParticipants = Number(participant);
    if (isNaN(numParticipants) || numParticipants < 1) {
      return NextResponse.json({ error: 'Invalid number of participants' }, { status: 400 });
    }

    // Insert booking into divebooking table
    try {
      await pool.execute(
        `INSERT INTO divebooking 
          (user_id, name, email, status, date, time, participant, level, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [user_id, name, email, 'Pending', date, time, numParticipants, level, message]
      );
    } catch (dbError) {
      console.error('MySQL Error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send confirmation email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Dive Booking Received ⏳',
        html: `<p>Hi ${name},</p>
               <p>Your dive booking for <strong>${new Date(date).toLocaleDateString()}</strong> at <strong>${time}</strong> has been received and is pending confirmation.</p>
               <p>We will notify you once it is approved.</p>
               <br/>
               <p>Best regards,</p>
               <p>Your Dive Center Team</p>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Email Error:', mailError);
      return NextResponse.json({ message: 'Booking saved, but failed to send email.' });
    }

    return NextResponse.json({ message: 'Booking saved and email sent!' });
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}
