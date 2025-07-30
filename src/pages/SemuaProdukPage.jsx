import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "@/features/courses/coursesThunk";

import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import EditProdukModal from "@/components/EditProdukModal";
import AddProductForm from "@/components/AddProductForm";
import useFilteredCourses from "@/hooks/useFilteredCourses";
import { normalizeCourse } from "@/utils/normalizeCourse";

export default function SemuaProdukPage() {
  const dispatch = useDispatch();

  // Global state
  const courses = useSelector((state) => state.courses.items);

  // Lokal state
  const [filter, setFilter] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filtered data
  const filteredCourses = useFilteredCourses(courses, filter);
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  // Ambil data dari MockAPI
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Jika currentPage melebihi total halaman, reset
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Tambah produk
  const handleAddCourse = (newCourse) => {
    dispatch(addCourse(newCourse));
    setShowAddForm(false);
  };

  // Update produk
  const handleUpdateCourse = (updatedCourse) => {
    const id = courses[editingIndex]?.id;
    if (id) dispatch(updateCourse({ id, updatedCourse }));
  };

  // Hapus produk
  const handleDeleteCourse = (index) => {
    const id = courses[index]?.id;
    if (id) dispatch(deleteCourse(id));
  };

  // Menangani loading awal
  const isLoading = courses.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1300px] mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4">
          <SidebarFilter onFilterChange={setFilter} />
        </aside>

        {/* Konten utama */}
        <section className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Semua Produk</h2>
            <SortDropdown />
          </div>

          {/* Tombol toggle tambah produk */}
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
          >
            {showAddForm ? "Tutup Form" : "Tambah Produk"}
          </button>

          {/* Form Tambah Produk */}
          {showAddForm && <AddProductForm onAdd={handleAddCourse} />}

          {/* Loading State */}
          {isLoading ? (
            <p className="text-center text-gray-500 py-10">Memuat data produk...</p>
          ) : (
            <>
              {/* Daftar Produk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {currentCourses.length > 0 ? (
                  currentCourses.map((course, index) => {
                    const realIndex = indexOfFirstItem + index;
                    const normalized = normalizeCourse(course);

                    return (
                      <ProductCard
                        key={realIndex}
                        {...normalized}
                        onDelete={() => handleDeleteCourse(realIndex)}
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
              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Modal Edit Produk */}
      <EditProdukModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        course={courses[editingIndex]}
        onSave={(updatedCourse) => {
          handleUpdateCourse(updatedCourse);
          setIsEditOpen(false);
        }}
      />
    </div>
  );
}
