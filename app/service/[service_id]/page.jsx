import Link from 'next/link';
import { getServiceById } from '@/lib/services';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const service = getServiceById(params.service_id);

    if (!service) {
        return {
            title: 'Service Not Found'
        };
    }

    return {
        title: `${service.name} - Care.xyz`,
        description: service.fullDescription,
        keywords: `${service.name}, caretaker, Bangladesh, ${service.title}`,
    };
}

export default function ServiceDetailPage({ params }) {
    const service = getServiceById(params.service_id);

    if (!service) {
        notFound();
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    {/* Service Header */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="bg-linear-to-r from-blue-600 to-blue-800 p-12 text-white text-center">
                            <div className="text-8xl mb-4">{service.icon}</div>
                            <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
                            <p className="text-xl text-blue-100">{service.title}</p>
                        </div>

                        <div className="p-8">
                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">About This Service</h2>
                                <p className="text-gray-700 text-lg leading-relaxed">{service.fullDescription}</p>
                            </div>

                            {/* Pricing */}
                            <div className="mb-8 bg-blue-50 p-6 rounded-xl">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Pricing</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">৳{service.price}</div>
                                        <div className="text-gray-600">Per Day</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">৳{service.hourlyPrice}</div>
                                        <div className="text-gray-600">Per Hour</div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">What's Included</h2>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start">
                                            <span className="text-green-600 mr-2 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="mb-8 grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="font-semibold text-gray-800 mb-1">Age Range</div>
                                    <div className="text-gray-600">{service.ageRange}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="font-semibold text-gray-800 mb-1">Availability</div>
                                    <div className="text-gray-600">{service.availability}</div>
                                </div>
                            </div>

                            {/* Book Button */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/booking/${service.id}`}
                                    className="btn btn-primary flex-1 text-center text-lg py-4"
                                >
                                    Book This Service Now
                                </Link>
                                <Link
                                    href="/"
                                    className="btn btn-outline flex-1 text-center text-lg py-4"
                                >
                                    View All Services
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                        <h3 className="font-bold text-yellow-800 mb-2">Need Help Choosing?</h3>
                        <p className="text-yellow-700">
                            Contact our support team for personalized recommendations based on your specific needs.
                            We're here to help you find the perfect caretaker for your loved ones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}