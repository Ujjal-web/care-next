'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-3xl">👨‍⚕️</span>
                        <span className="text-2xl font-bold text-blue-600">Care.xyz</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                            Home
                        </Link>
                        <Link href="/#services" className="text-gray-700 hover:text-blue-600 font-medium transition">
                            Services
                        </Link>
                        {session && (
                            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                My Bookings
                            </Link>
                        )}

                        {session ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Hi, {session.user?.name}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="btn btn-primary"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="btn btn-outline">
                                    Login
                                </Link>
                                <Link href="/register" className="btn btn-primary">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                                Home
                            </Link>
                            <Link href="/#services" className="text-gray-700 hover:text-blue-600 font-medium">
                                Services
                            </Link>
                            {session && (
                                <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium">
                                    My Bookings
                                </Link>
                            )}

                            {session ? (
                                <>
                                    <span className="text-gray-700">Hi, {session.user?.name}</span>
                                    <button
                                        onClick={() => signOut()}
                                        className="btn btn-primary w-full"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn btn-outline w-full">
                                        Login
                                    </Link>
                                    <Link href="/register" className="btn btn-primary w-full">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}