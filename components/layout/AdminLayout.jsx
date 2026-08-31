import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Head from 'next/head';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans overflow-hidden bg-[#050505] text-white relative">

      <Head><title>Admin Panel</title></Head>
      
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111111]  border-b border-[#333] shadow-md text-gray-900 flex items-center justify-between px-4 z-50">
        <h2 className="text-xl font-heading font-normal tracking-wider">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 md:z-0 flex-shrink-0 w-64`}>
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8 overflow-y-auto w-full h-full relative">
        <div className="max-w-5xl mx-auto rounded-xl bg-[#111111]  border border-[#333] shadow-2xl text-gray-900 p-4 md:p-8 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}