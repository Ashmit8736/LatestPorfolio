import AdminSidebar from './AdminSidebar';
import Head from 'next/head';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Head><title>Admin Panel</title></Head>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen relative">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}