'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getServiceById, divisions, districts, calculateTotalCost } from '@/lib/services';

export default function BookingPage({ params }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [service, setService] = useState(null);

    const [formData, setFormData] = useState({
        duration: 1,
        durationType: 'days',
        division: '',
        district: '',
        city: '',
        area: '',
        address: ''
    });

    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/login?redirect=/booking/${params.service_id}`);
        }
    }, [status, router, params.service_id]);

    useEffect(() => {
        const serviceData = getServiceById(params.service_id);
        setService(serviceData);
    }, [params.service_id]);

    useEffect(() => {
        if (formData.division) {
            setAvailableDistricts(districts[formData.division] || []);
            setFormData(prev => ({ ...prev, district: '' }));
        }
    }, [formData.division]);

    useEffect(() => {
        if (service) {
            const cost = calculateTotalCost(service.id, formData.duration, formData.durationType);
            setTotalCost(cost);
        }
    }, [service, formData.duration, formData.durationType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const bookingData = {
                serviceId: service.id,
                serviceName: service.name,
                userId: session.user.email,
                userName: session.user.name,
                ...formData,
                totalCost,
                status: 'Pending'
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Booking confirmed! Check your email for invoice.');
                router.push('/my-bookings');
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading' || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">{service.icon}</div>
                            <h1 className="text-3xl font-bold mb-2">Book {service.name}</h1>
                            <p className="text-gray-600">Fill in the details to complete your booking</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Duration */}
                            <div>
                                <label className="label">Select Duration</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="number"
                                            name="duration"
                                            min="1"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <select
                                            name="durationType"
                                            value={formData.durationType}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        >
                                            <option value="hours">Hours</option>
                                            <option value="days">Days</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="label">Division</label>
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="">Select Division</option>
                                    {divisions.map(div => (
                                        <option key={div} value={div}>{div}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">District</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                    disabled={!formData.division}
                                >
                                    <option value="">Select District</option>
                                    {availableDistricts.map(dist => (
                                        <option key={dist} value={dist}>{dist}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Enter your city"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Area</label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Enter your area"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Full Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input"
                                    rows="3"
                                    placeholder="Enter complete address"
                                    required
                                ></textarea>
                            </div>

                            {/* Cost Summary */}
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Service:</span>
                                        <span className="font-semibold">{service.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Duration:</span>
                                        <span className="font-semibold">{formData.duration} {formData.durationType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Rate:</span>
                                        <span className="font-semibold">
                                            ৳{formData.durationType === 'hours' ? service.hourlyPrice : service.price}/{formData.durationType === 'hours' ? 'hour' : 'day'}
                                        </span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between text-xl">
                                            <span className="font-bold text-gray-800">Total Cost:</span>
                                            <span className="font-bold text-blue-600">৳{totalCost}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}