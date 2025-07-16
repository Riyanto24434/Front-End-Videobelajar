export default function SelectField({ id, label, options, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-sm mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        value={value}          
        onChange={onChange}  
        required
        className="w-full border rounded px-3 py-2 text-sm"
      >
        <option value="">Pilih {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
