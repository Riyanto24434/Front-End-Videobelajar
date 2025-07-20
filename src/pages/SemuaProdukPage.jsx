// src/pages/SemuaProdukPage.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const courseData = [
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K"
  },
  {
    image: "/Images/images-kelas/2.png",
    title: "UI/UX Design Mastery",
    instructorImg: "/Images/Avatar Pengajar/2.png",
    instructorName: "Budi Santoso",
    instructorTitle: "Lead Designer di Tokopedia",
    ratingValue: "4.9",
    reviewCount: "(210)",
    originalPrice: "Rp 500K",
    discountPrice: "Rp 325K"
  },
  // Tambah lainnya sesuai kebutuhan
];

export default function SemuaProdukPage() {
  const [filter, setFilter] = useState({});
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const location = useLocation();


  useEffect(() => {
    let result = [...courseData];

    // Filter kategori
    if (filter.selectedCategories?.length) {
      result = result.filter((course) =>
        filter.selectedCategories.some((cat) =>
          course.title.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Filter harga
    const min = parseInt(filter.priceRange?.min || 0);
    const max = parseInt(filter.priceRange?.max || Infinity);
    if (filter.priceRange?.min || filter.priceRange?.max) {
      result = result.filter((course) => {
        const harga = parseInt(course.discountPrice.replace(/\D/g, ""));
        return harga >= min && harga <= max;
      });
    }

    // Filter durasi dummy
    if (filter.selectedDuration) {
      if (filter.selectedDuration === "< 2 jam") {
        result = result.filter((c) => c.title.includes("1"));
      } else if (filter.selectedDuration === "2–5 jam") {
        result = result.filter((c) => c.title.includes("4"));
      } else if (filter.selectedDuration === "> 5 jam") {
        result = result.filter((c) => c.title.includes("8"));
      }
    }

    setFilteredCourses(result);
  }, [filter]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav>
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/Images/logo.png" alt="Video Belajar Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-right">
          <Link
            to="/semua-produk"
            className={`kategori-link ${location.pathname === "/semua-produk" ? "text-green-600 font-semibold" : ""}`}
          >
            Kategori
          </Link>
          <div className="avatar-dropdown">
            <img
              src="/Images/musk.jpg"
              alt="Avatar"
              className="avatar"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profil" onClick={() => setIsDropdownOpen(false)}>Profil Saya</Link>
                <Link to="/kelas" onClick={() => setIsDropdownOpen(false)}>Kelas Saya</Link>
                <Link to="/pesanan" onClick={() => setIsDropdownOpen(false)}>Pesanan Saya</Link>
                <button onClick={handleLogout} className="logout-link">Keluar ↩</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1300px] mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4">
          <SidebarFilter onFilterChange={(f) => setFilter(f)} />
        </aside>

        {/* Konten Produk */}
        <section className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Semua Produk</h2>
            <SortDropdown />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <ProductCard key={index} {...course} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">Tidak ada produk yang cocok dengan filter.</p>
            )}
          </div>

          <div className="mt-10">
            <Pagination />
          </div>
        </section>
      </main>
    </div>
  );
}
