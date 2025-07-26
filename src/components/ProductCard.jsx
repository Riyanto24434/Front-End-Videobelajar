// src/components/ProductCard.jsx

export default function ProductCard({
  image,
  title,
  instructorImg,
  instructorName,
  instructorTitle,
  ratingValue,
  reviewCount,
  originalPrice,
  discountPrice,
  duration,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden relative">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover bg-gray-100"
        onError={(e) => (e.target.src = "/Images/default-course.jpg")}
      />

      {/* Tombol Edit */}
      {typeof onEdit === "function" && (
        <button
          onClick={onEdit}
          className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
      )}

      {/* Tombol Hapus */}
      {typeof onDelete === "function" && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
        >
          Hapus
        </button>
      )}

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {title || "Tanpa Judul"}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={instructorImg}
            alt={instructorName}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => (e.target.src = "/Images/default-instructor.jpg")}
          />
          <div className="text-sm text-gray-600">
            <p className="font-medium">{instructorName}</p>
            <p className="text-xs">{instructorTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-500 font-medium mt-1">
          <span>⭐ {ratingValue ?? "4.5"}</span>
          <span className="text-gray-400 font-normal">{reviewCount}</span>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <span className="text-gray-500 line-through text-sm">
            {originalPrice || "Rp0"}
          </span>
          <span className="text-base font-semibold text-green-600">
            {discountPrice || "Rp0"}
          </span>
        </div>

        {/* ✅ Durasi Kursus */}
        <div className="text-xs text-gray-400 mt-1">
          <span className="mr-1">🕒</span>
          {duration || "Durasi tidak tersedia"}
        </div>
      </div>
    </div>
  );
}
