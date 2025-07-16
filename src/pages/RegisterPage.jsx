import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import PasswordField from "@/components/PasswordField";
import Divider from "@/components/Divider";
import { PrimaryButton, SecondaryButton, GoogleButton } from "@/components/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!form.email.includes("@")) newErrors.email = "Email tidak valid";
    if (!form.gender) newErrors.gender = "Pilih jenis kelamin";
    if (!form.phone.trim() || form.phone.length < 9) newErrors.phone = "No HP tidak valid";
    if (form.password.length < 6) newErrors.password = "Password minimal 6 karakter";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Konfirmasi tidak cocok";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length === 0) {
      alert("Form berhasil dikirim!");
      // Ambil data user lama (jika ada)
    const existing = JSON.parse(localStorage.getItem("users")) || [];

    // Buat data user baru (password bisa dienkripsi nanti)
    const newUser = {
      nama: form.nama,
      email: form.email,
      gender: form.gender,
      phone: form.phone,
      password: form.password,
    };

    // Simpan ke localStorage
    localStorage.setItem("users", JSON.stringify([...existing, newUser]));

    alert("Pendaftaran berhasil! Silakan login.");

    // Reset form (opsional)
    setForm({
      nama: "",
      email: "",
      gender: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    // Arahkan ke halaman login
      navigate("/login");
    } else {
      setErrors(foundErrors);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold text-center text-gray-800">Pendaftaran Akun</h3>
        <p className="text-sm text-center text-gray-500 mb-4">Yuk, daftarkan akunmu sekarang juga!</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <InputField id="nama" label="Nama Lengkap" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>
          <div>
            <InputField id="email" label="E-Mail" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <SelectField id="gender" label="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} value={form.gender} onChange={handleChange} />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">No. HP <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select className="border rounded px-2 py-2 text-sm w-20" disabled>
                <option value="+62">+62</option>
              </select>
              <input
                id="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="812xxxxxxx"
                className="border rounded px-3 py-2 w-full text-sm"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <PasswordField id="password" label="Kata Sandi" value={form.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <PasswordField id="confirmPassword" label="Konfirmasi Kata Sandi" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="text-right text-sm"><a href="#" className="text-blue-500 hover:underline">Lupa Password?</a></div>
          <PrimaryButton>Daftar</PrimaryButton>
          <Link to="/login">
            <SecondaryButton>Masuk</SecondaryButton>
          </Link>
          <Divider />
          <GoogleButton />
        </form>
      </div>
    </main>
  );
}
