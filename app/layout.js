// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Care.xyz - Professional Care Services',
  description: 'Reliable and trusted care services for children, elderly, and family members. Find and hire professional caretakers for babysitting, elderly care, and special care at home.',
  keywords: 'babysitting, elderly care, home care, caretaker, Bangladesh care service',
  openGraph: {
    title: 'Care.xyz - Professional Care Services',
    description: 'Reliable and trusted care services for children, elderly, and family members',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
            <Navbar />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}