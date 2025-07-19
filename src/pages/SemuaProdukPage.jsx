// src/pages/SemuaProdukPage.jsx
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

export default function SemuaProdukPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1300px] mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4">
          <SidebarFilter />
        </aside>

        {/* Konten Produk */}
        <section className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Semua Produk</h2>
            <SortDropdown />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Dummy produk */}
            {[...Array(6)].map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination />
          </div>
        </section>
      </main>
    </div>
  );
}
