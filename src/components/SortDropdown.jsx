export default function SortDropdown() {
  return (
    <select className="border px-2 py-1 rounded">
      <option value="default">Urutkan</option>
      <option value="terbaru">Terbaru</option>
      <option value="terlaris">Terlaris</option>
      <option value="termurah">Termurah</option>
    </select>
  );
}
