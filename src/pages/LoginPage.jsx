import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import { PrimaryButton, GoogleButton, SecondaryButton } from "@/components/Button";
import Divider from "@/components/Divider";


export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === form.email && user.password === form.password
    );

    if (foundUser) {
      alert("Login berhasil!");
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/beranda");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold text-center text-gray-800">Masuk Akun</h3>
        <p className="text-sm text-center text-gray-500 mb-4">Selamat datang kembali!</p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <InputField
            id="email"
            label="E-Mail"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
          />
          <PasswordField
            id="password"
            label="Kata Sandi"
            value={form.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-right text-sm">
            <a href="#" className="text-blue-500 hover:underline">Lupa Password?</a>
          </div>
          <PrimaryButton>Masuk</PrimaryButton>

          <Link to="/register">
            <SecondaryButton>Daftar</SecondaryButton>
          </Link>

          <Divider />
          <GoogleButton />
        </form>
      </div>
    </main>
  );
}
