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
  discountPrice
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <img src={instructorImg} alt={instructorName} className="w-8 h-8 rounded-full object-cover" />
          <div className="text-sm text-gray-600">
            <p className="font-medium">{instructorName}</p>
            <p className="text-xs">{instructorTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-yellow-500 font-medium mt-1">
          <span>⭐ {ratingValue}</span>
          <span className="text-gray-400 font-normal">{reviewCount}</span>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
          <span className="text-base font-semibold text-green-600">{discountPrice}</span>
        </div>
      </div>
    </div>
  );
}
