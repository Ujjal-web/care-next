import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { booking, email } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Booking Confirmation - Care.xyz',
            html: `
        <h2>Booking Confirmed!</h2>
        <p>Thank you for booking with Care.xyz</p>
        <h3>Booking Details:</h3>
        <ul>
          <li>Service: ${booking.serviceName}</li>
          <li>Duration: ${booking.duration} ${booking.durationType}</li>
          <li>Location: ${booking.city}, ${booking.district}</li>
          <li>Total Cost: ৳${booking.totalCost}</li>
          <li>Status: ${booking.status}</li>
        </ul>
        <p>We will contact you soon to confirm your booking.</p>
      `
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent' });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ message: 'Email failed' }, { status: 500 });
    }
}