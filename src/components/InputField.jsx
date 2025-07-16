export default function InputField({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-sm mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}         
        onChange={onChange}   
        required
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
