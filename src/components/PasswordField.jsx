import { useState } from "react";

export default function PasswordField({ id, label, value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-sm mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          required
          className="w-full border rounded px-3 py-2 pr-10 text-sm"
        />
        <span
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-sm"
          onClick={() => setVisible(!visible)}
        >
          <i className={`fas ${visible ? "fa-eye-slash" : "fa-eye"}`}></i>
        </span>
      </div>
    </div>
  );
}
