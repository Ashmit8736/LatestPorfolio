import Link from 'next/link';
import AdminLayout from '../../components/layout/AdminLayout';

const SECTIONS = [
  { name: 'Profile', path: '/admin/profile', desc: 'Name, headline, bio and contact details' },
  { name: 'Experiences', path: '/admin/experiences', desc: 'Companies, roles and durations' },
  { name: 'Education', path: '/admin/education', desc: 'Degrees, institutions and scores' },
  { name: 'Projects', path: '/admin/projects', desc: 'Portfolio projects with links and images' },
  { name: 'Skills', path: '/admin/skills', desc: 'Tech stack grouped by category' },
  { name: 'Social Links', path: '/admin/socials', desc: 'GitHub, LinkedIn and other profiles' },
  { name: 'Enquiries', path: '/admin/enquiries', desc: 'Messages from the contact form' },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="mb-10">
        <p className="admin-eyebrow">Dashboard</p>
        <h1 className="admin-title">
          Manage your <span className="text-accent">Portfolio</span>
        </h1>
        <p className="admin-subtitle">Welcome to the portfolio admin panel. Use the sidebar to manage your content.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(section => (
          <Link
            key={section.path}
            href={section.path}
            className="group admin-card p-5 flex flex-col gap-1.5 hover:border-accent transition-colors"
          >
            <span className="flex items-center justify-between">
              <span className="font-heading font-bold text-ink">{section.name}</span>
              <span aria-hidden="true" className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition">→</span>
            </span>
            <span className="text-sm text-muted">{section.desc}</span>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
