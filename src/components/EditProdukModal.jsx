// src/components/EditProdukModal.jsx
import { useState, useEffect } from "react";

export default function EditProdukModal({ isOpen, onClose, course, onSave }) {
  const [formData, setFormData] = useState({ ...course });

  useEffect(() => {
    if (isOpen) setFormData(course);
  }, [isOpen, course]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Judul" className="border p-1 w-full" required />
          <input name="image" value={formData.image} onChange={handleChange} placeholder="URL Gambar" className="border p-1 w-full" required />
          <input name="instructorName" value={formData.instructorName} onChange={handleChange} placeholder="Nama Instruktur" className="border p-1 w-full" required />
          <input name="instructorTitle" value={formData.instructorTitle} onChange={handleChange} placeholder="Jabatan Instruktur" className="border p-1 w-full" />
          <input name="instructorImg" value={formData.instructorImg} onChange={handleChange} placeholder="URL Avatar Instruktur" className="border p-1 w-full" />
          <input name="ratingValue" value={formData.ratingValue} onChange={handleChange} placeholder="Rating (contoh: 4.5)" className="border p-1 w-full" />
          <input name="reviewCount" value={formData.reviewCount} onChange={handleChange} placeholder="Jumlah Review (contoh: (100))" className="border p-1 w-full" />
          <input name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Harga Asli" className="border p-1 w-full" />
          <input name="discountPrice" value={formData.discountPrice} onChange={handleChange} placeholder="Harga Diskon" className="border p-1 w-full" />
          <input name="duration" value={formData.duration || ""} onChange={handleChange} placeholder="Durasi (misal: 12 Jam)" className="border p-1 w-full" />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Batal</button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
