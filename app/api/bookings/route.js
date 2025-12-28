import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';

export async function GET(request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await db.bookings.findByUserId(session.user.email);
    return NextResponse.json(bookings);
}

export async function POST(request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const booking = await db.bookings.create(body);

        // Send email invoice
        await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking, email: session.user.email })
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    await db.bookings.update(bookingId, { status: 'Cancelled' });
    return NextResponse.json({ message: 'Booking cancelled' });
}