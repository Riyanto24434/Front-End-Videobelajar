import { useState } from "react";
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import SortDropdown from "@/components/SortDropdown";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import EditProdukModal from "@/components/EditProdukModal";
import AddProductForm from "@/components/AddProductForm";
import useFilteredCourses from "@/hooks/useFilteredCourses";
import courseData from "@/data/courseDummy";

export default function SemuaProdukPage() {
  const [filter, setFilter] = useState({});
  const [courses, setCourses] = useState(courseData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const filteredCourses = useFilteredCourses(courses, filter);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handleAddCourse = (newCourse) => {
    const updated = [...courses, newCourse];
    setCourses(updated);
  };

  const handleEditCourse = (updatedCourse) => {
    const updated = [...courses];
    updated[editingIndex] = updatedCourse;
    setCourses(updated);
  };

  const handleDelete = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-[1300px] mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <SidebarFilter onFilterChange={setFilter} />
        </aside>

        <section className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Semua Produk</h2>
            <SortDropdown />
          </div>

          <AddProductForm onAdd={handleAddCourse} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => {
                const realIndex = indexOfFirstItem + index;
                return (
                  <ProductCard
                    key={realIndex}
                    {...course}
                    onDelete={() => handleDelete(realIndex)}
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
          handleEditCourse(updatedCourse);
          setIsEditOpen(false);
        }}
      />
    </div>
  );
}
