export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Care.xyz</h3>
                        <p className="text-gray-400">Professional care services for your loved ones.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/">Home</a></li>
                            <li><a href="/#services">Services</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400">Email: info@care.xyz</p>
                        <p className="text-gray-400">Phone: +880 1234-567890</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; 2024 Care.xyz. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}