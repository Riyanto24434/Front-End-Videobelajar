import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import BerandaPage from "@/pages/BerandaPage";
import SemuaProduk from "./pages/SemuaProduk";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/beranda" element={<BerandaPage />} />
      <Route path="/" element={<SemuaProduk />} />
    </Routes>
  );
}

export default App;

console.log("ENV ALL:", import.meta.env);
console.log("API URL:", import.meta.env.VITE_API_URL);
