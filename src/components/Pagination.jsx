// src/components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-4 py-2 border mx-1 rounded ${
          i === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-700"
        }`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex justify-center mt-6">{pages}</div>;
}
