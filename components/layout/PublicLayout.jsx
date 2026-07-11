import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}