import Link from 'next/link';

export default function AdminSidebar() {
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
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {links.map(link => (
          <Link key={link.name} href={link.path} className="block px-6 py-3 hover:bg-gray-800 transition">
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button onClick={() => {
          fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login');
        }} className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition">Logout</button>
      </div>
    </aside>
  );
}