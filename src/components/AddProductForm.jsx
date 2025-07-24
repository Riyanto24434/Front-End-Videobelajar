// src/components/AddProductForm.jsx

export default function AddProductForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newCourse = {
      image: form.image.value,
      title: form.title.value,
      instructorImg: form.instructorImg.value,
      instructorName: form.instructorName.value,
      instructorTitle: form.instructorTitle.value,
      ratingValue: parseFloat(form.ratingValue.value),
      reviewCount: parseInt(form.reviewCount.value),
      originalPrice: parseInt(form.originalPrice.value),
      discountPrice: parseInt(form.discountPrice.value),
    };

    // Validasi sederhana
    if (
      !newCourse.title ||
      !newCourse.image ||
      isNaN(newCourse.ratingValue) ||
      isNaN(newCourse.reviewCount)
    ) {
      alert("Mohon lengkapi data dengan benar.");
      return;
    }

    onAdd(newCourse);
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4 border p-6 rounded bg-white shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800">Tambah Produk</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Judul Kursus"
          className="input-style"
          required
        />
        <input
          name="image"
          placeholder="URL Gambar Kursus"
          className="input-style"
          required
        />
        <input
          name="instructorName"
          placeholder="Nama Instruktur"
          className="input-style"
        />
        <input
          name="instructorTitle"
          placeholder="Posisi Instruktur"
          className="input-style"
        />
        <input
          name="instructorImg"
          placeholder="Foto Instruktur (URL)"
          className="input-style"
        />
        <input
          name="ratingValue"
          placeholder="Rating (misal: 4.5)"
          type="number"
          step="0.1"
          className="input-style"
          required
        />
        <input
          name="reviewCount"
          placeholder="Jumlah Review"
          type="number"
          className="input-style"
          required
        />
        <input
          name="originalPrice"
          placeholder="Harga Asli"
          type="number"
          className="input-style"
        />
        <input
          name="discountPrice"
          placeholder="Harga Diskon"
          type="number"
          className="input-style"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Simpan Produk
        </button>
      </div>
    </form>
  );
}
