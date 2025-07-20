export default function Navbar({ activePage }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <img src="/Images/logo.png" alt="VideoBelajar" className="h-8" />
      <div className="flex items-center gap-4">
        <Link
          to="/semua-produk"
          className={`text-sm font-medium ${activePage === "kategori" ? "text-green-600 font-semibold" : "text-gray-600 hover:text-black"}`}
        >
          Kategori
        </Link>
        <button className="bg-yellow-400 text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-500">Daftar</button>
      </div>
    </nav>
  );
}
