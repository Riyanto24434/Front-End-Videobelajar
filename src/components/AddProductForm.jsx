// src/components/AddProductForm.jsx
export default function AddProductForm({ onAdd }) {
  return (
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
        onAdd(newCourse);
        form.reset();
      }}
      className="mb-6 space-y-2 border p-4 rounded bg-white shadow"
    >
      <h3 className="text-lg font-semibold">Tambah Produk</h3>
      {/* input fields */}
    </form>
  );
}
