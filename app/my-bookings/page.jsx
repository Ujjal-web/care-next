'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            fetchBookings();
        }
    }, [session]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const response = await fetch(`/api/bookings?id=${bookingId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchBookings();
                alert('Booking cancelled successfully');
            }
        } catch (error) {
            alert('Failed to cancel booking');
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container">
                <h1 className="text-4xl font-bold text-center mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
                        <a href="/#services" className="btn btn-primary">
                            Browse Services
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{booking.serviceName}</h3>
                                        <p className="text-gray-600">Booking ID: {booking.id}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Duration</p>
                                        <p className="font-semibold">{booking.duration} {booking.durationType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Cost</p>
                                        <p className="font-semibold text-blue-600">৳{booking.totalCost}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-semibold">{booking.city}, {booking.district}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Booked On</p>
                                        <p className="font-semibold">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {booking.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="btn bg-red-600 text-white hover:bg-red-700 w-full"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}