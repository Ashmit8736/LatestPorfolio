import AdminLayout from '../../components/layout/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome to the portfolio admin panel. Use the sidebar to manage your content.</p>
    </AdminLayout>
  );
}