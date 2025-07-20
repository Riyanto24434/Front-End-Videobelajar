import { useState } from "react";

export default function SidebarFilter({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedDuration, setSelectedDuration] = useState("");

  const categories = ["Digital & Teknologi", "Desain", "Pemasaran", "Bisnis"];
  const durations = ["< 2 jam", "2–5 jam", "> 5 jam"];

  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange({ selectedCategories: updated, priceRange, selectedDuration });
  };

  const handlePriceChange = (e) => {
    const updated = { ...priceRange, [e.target.name]: e.target.value };
    setPriceRange(updated);
    onFilterChange({ selectedCategories, priceRange: updated, selectedDuration });
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    onFilterChange({ selectedCategories, priceRange, selectedDuration: duration });
  };

  return (
    <aside className="w-full lg:w-64 p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>

      {/* Kategori */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Kategori</h4>
        {categories.map((category) => (
          <label key={category} className="block text-sm mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Harga */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Harga (Rp)</h4>
        <div className="flex gap-2">
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Durasi */}
      <div>
        <h4 className="font-medium mb-2">Durasi</h4>
        {durations.map((dur) => (
          <label key={dur} className="block text-sm mb-1">
            <input
              type="radio"
              name="duration"
              className="mr-2"
              checked={selectedDuration === dur}
              onChange={() => handleDurationChange(dur)}
            />
            {dur}
          </label>
        ))}
      </div>
    </aside>
  );
}
