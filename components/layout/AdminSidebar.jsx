import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminSidebar({ onNavigate }) {
  const router = useRouter();

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Profile', path: '/admin/profile' },
    { name: 'Experiences', path: '/admin/experiences' },
    { name: 'Education', path: '/admin/education' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Skills', path: '/admin/skills' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Industries', path: '/admin/industries' },
    { name: 'Service Detail', path: '/admin/service-detail' },
    { name: 'Social Links', path: '/admin/socials' },
    { name: 'Enquiries', path: '/admin/enquiries' },
  ];

  // Dashboard sirf exact /admin pe active; baaki apne new/edit pages pe bhi
  const currentPath = router.pathname || '';
  const isActive = (path) =>
    path === '/admin' ? currentPath === '/admin' : currentPath.startsWith(path);

  return (
    <aside className="w-full h-full bg-ink text-on-dark flex flex-col pt-20 md:pt-0 overflow-y-auto">
      <div className="px-6 py-7 hidden md:flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-ink font-heading font-extrabold">A</span>
        <div className="leading-tight">
          <p className="font-heading font-extrabold text-lg tracking-wide text-cream">Ashmit.</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-3 md:mt-2 space-y-1">
        {links.map(link => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.name}
              href={link.path}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center px-4 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${
                active
                  ? 'bg-accent text-ink shadow-[0_10px_30px_-12px_rgba(245,166,35,0.7)]'
                  : 'text-on-dark hover:text-accent hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button onClick={() => {
          fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login');
        }} className="w-full py-2.5 rounded-full border border-accent/50 text-accent font-heading font-semibold text-xs uppercase tracking-wider hover:bg-accent hover:text-ink transition-colors">Logout</button>
      </div>
    </aside>
  );
}
