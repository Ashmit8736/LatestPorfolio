export default function Footer() {
  return (
    <footer className="bg-[#1C1712] pt-4">
      <div className="border-t border-[#332B22] py-8 text-center">
        <p className="text-[#B7AC98] text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-[#F5A623] font-semibold">Ashmit Singh</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
