import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminSidebar from './AdminSidebar';
import Head from 'next/head';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const isDashboard = router.pathname === '/admin';

  return (
    <div className="flex h-screen font-sans overflow-hidden bg-cream text-ink relative selection:bg-accent/40">

      <Head><title>Admin Panel</title></Head>

      {/* Mobile Top Bar — portfolio navbar jaisa dark pill */}
      <div className="md:hidden fixed top-3 left-3 right-3 h-14 bg-ink rounded-full shadow-[0_10px_40px_-10px_rgba(28,23,18,0.5)] flex items-center justify-between pl-3 pr-2 z-50">
        <div className="flex items-center gap-2 min-w-0">
          {!isDashboard && (
            <Link
              href="/admin"
              className="p-2 -ml-1 text-cream hover:text-accent transition-colors flex-shrink-0"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <span className="flex items-center gap-2 font-heading font-extrabold tracking-wide text-cream truncate">
            <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-ink text-sm flex-shrink-0">A</span>
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-cream hover:text-accent transition-colors flex-shrink-0"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 md:z-0 flex-shrink-0 w-64`}>
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full h-full relative">
        {/* Hero section jaisa halka amber glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-[150px] opacity-20"
        />
        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-12 md:px-10 md:pt-12">
          {children}
        </div>
      </main>
    </div>
  );
}
