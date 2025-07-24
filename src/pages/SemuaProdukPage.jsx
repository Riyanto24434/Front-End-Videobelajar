import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import EditProdukModal from "@/components/EditProdukModal";

const courseData = [
  /* DATA PRODUK DUMMY */
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
  {
    image: "/Images/images-kelas/1.jpg",
    title: "Full Stack Web Developer",
    instructorImg: "/Images/Avatar Pengajar/1.png",
    instructorName: "Jenna Ortega",
    instructorTitle: "Senior Accountant di Gojek",
    ratingValue: "4.5",
    reviewCount: "(120)",
    originalPrice: "Rp 900K",
    discountPrice: "Rp 700K",
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
    discountPrice: "Rp 325K",
  },
];

export default function SemuaProdukPage() {
  const [filter, setFilter] = useState({});
  const [courses, setCourses] = useState(courseData);
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  useEffect(() => {
    let result = [...courses];

    if (filter.selectedCategories?.length) {
      result = result.filter((course) =>
        filter.selectedCategories.some((cat) =>
          course.title.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    const min = parseInt(filter.priceRange?.min || 0);
    const max = parseInt(filter.priceRange?.max || Infinity);
    if (filter.priceRange?.min || filter.priceRange?.max) {
      result = result.filter((course) => {
        const harga = parseInt(course.discountPrice.replace(/\D/g, ""));
        return harga >= min && harga <= max;
      });
    }

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
    setCurrentPage(1); // reset ke halaman pertama saat filter berubah
  }, [filter, courses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1300px] mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <SidebarFilter onFilterChange={(f) => setFilter(f)} />
        </aside>

        <section className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Semua Produk</h2>
            <SortDropdown />
          </div>

          {/* Form Tambah Produk */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const newCourse = {
                image: form.image.value,
                title: form.title.value,
                instructorImg: form.instructorImg.value,
                instructorName: form.instructorName.value,
                instructorTitle: form.instructorTitle.value,
                ratingValue: form.ratingValue.value,
                reviewCount: form.reviewCount.value,
                originalPrice: form.originalPrice.value,
                discountPrice: form.discountPrice.value,
              };
              const updatedCourses = [...courses, newCourse];
              setCourses(updatedCourses);
              setFilteredCourses(updatedCourses);
              form.reset();
            }}
            className="mb-6 space-y-2 border p-4 rounded bg-white shadow"
          >
            <h3 className="text-lg font-semibold">Tambah Produk</h3>
            <input name="title" placeholder="Judul" className="border p-1 w-full" required />
            <input name="image" placeholder="URL Gambar" className="border p-1 w-full" required />
            <input name="instructorName" placeholder="Nama Instruktur" className="border p-1 w-full" required />
            <input name="instructorTitle" placeholder="Jabatan Instruktur" className="border p-1 w-full" />
            <input name="instructorImg" placeholder="URL Avatar Instruktur" className="border p-1 w-full" />
            <input name="ratingValue" placeholder="Rating (contoh: 4.5)" className="border p-1 w-full" />
            <input name="reviewCount" placeholder="Jumlah Review (contoh: (100))" className="border p-1 w-full" />
            <input name="originalPrice" placeholder="Harga Asli" className="border p-1 w-full" />
            <input name="discountPrice" placeholder="Harga Diskon" className="border p-1 w-full" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Tambah</button>
          </form>

          {/* Daftar Produk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => {
                const realIndex = indexOfFirstItem + index;
                return (
                  <ProductCard
                    key={realIndex}
                    {...course}
                    onDelete={() => {
                      const updated = courses.filter((_, i) => i !== realIndex);
                      setCourses(updated);
                      setFilteredCourses(updated);
                    }}
                    onEdit={() => {
                      setEditingIndex(realIndex);
                      setIsEditOpen(true);
                    }}
                  />
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada produk yang cocok dengan filter.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>

      <EditProdukModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        course={courses[editingIndex]}
        onSave={(updatedCourse) => {
          const updatedCourses = [...courses];
          updatedCourses[editingIndex] = updatedCourse;
          setCourses(updatedCourses);
          setFilteredCourses(updatedCourses);
        }}
      />
    </div>
  );
}
