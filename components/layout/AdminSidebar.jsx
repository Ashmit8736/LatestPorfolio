import Link from 'next/link';

export default function AdminSidebar({ onNavigate }) {
  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Profile', path: '/admin/profile' },
    { name: 'Experiences', path: '/admin/experiences' },
    { name: 'Education', path: '/admin/education' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Skills', path: '/admin/skills' },
    { name: 'Social Links', path: '/admin/socials' },
    { name: 'Enquiries', path: '/admin/enquiries' },
  ];

  return (
    <aside className="w-full h-full bg-gray-900 text-white flex flex-col pt-16 md:pt-0 overflow-y-auto">
      <div className="p-6 hidden md:block">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-2 md:mt-6 flex-1">
        {links.map(link => (
          <Link key={link.name} href={link.path} onClick={onNavigate} className="block px-6 py-3 hover:bg-gray-800 transition">
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-6 mt-auto">
        <button onClick={() => {
          fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login');
        }} className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition">Logout</button>
      </div>
    </aside>
  );
}