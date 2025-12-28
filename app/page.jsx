import Link from 'next/link';
import { services } from '@/lib/services';

export const metadata = {
  title: 'Care.xyz - Professional Care Services for Your Family',
  description: 'Find reliable and trusted care services for children, elderly, and family members in Bangladesh. Book professional caretakers for babysitting, elderly care, and special care at home.',
};

export default function Home() {
  return (
    <div>
      {/* Banner Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Care Services for Your Loved Ones
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Reliable, trusted, and compassionate care services for children, elderly, and family members
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services" className="btn bg-white text-blue-600 hover:bg-gray-100">
                Explore Services
              </Link>
              <Link href="/register" className="btn bg-green-600 hover:bg-green-700">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title text-gray-800">Why Choose Care.xyz?</h2>
            <p className="section-subtitle">
              We make caregiving easy, secure, and accessible for everyone
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Verified Caretakers</h3>
                <p className="text-gray-600">
                  All our caretakers are background-verified and professionally trained
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">🕒</div>
                <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  Book services anytime with flexible hourly or daily options
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
                <p className="text-gray-600">
                  Transparent pricing with no hidden charges
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Professional care tailored to your family's needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 p-8 text-white">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-semibold mr-2">Price:</span>
                      <span>৳{service.price}/day or ৳{service.hourlyPrice}/hour</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-semibold mr-2">Availability:</span>
                      <span>{service.availability}</span>
                    </div>
                  </div>
                  <Link
                    href={`/service/${service.id}`}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by families across Bangladesh
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Excellent service! The caretaker was professional and very caring with my elderly mother. Highly recommend Care.xyz!"
              </p>
              <p className="font-semibold">- Fatema Rahman, Dhaka</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Found a wonderful babysitter through this platform. The booking process was so easy and convenient!"
              </p>
              <p className="font-semibold">- Ahmed Khan, Chittagong</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "The sick care service helped during my father's recovery. Very professional and compassionate team."
              </p>
              <p className="font-semibold">- Nazia Islam, Sylhet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Caretakers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-blue-100">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-blue-100">Divisions Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-linear-to-r from-green-500 to-green-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find the Perfect Caretaker?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of families who trust Care.xyz for their loved ones
            </p>
            <Link href="/register" className="btn bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
              Book a Service Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}