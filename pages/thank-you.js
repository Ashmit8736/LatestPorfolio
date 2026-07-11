import Link from 'next/link';
import PublicLayout from '../components/layout/PublicLayout';

export default function ThankYou() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-8">Your message has been successfully sent. I will get back to you soon.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Back to Portfolio
        </Link>
      </div>
    </PublicLayout>
  );
}