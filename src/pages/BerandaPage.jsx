// src/pages/BerandaPage.jsx
import "@/styles/beranda.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SemuaProdukPage from "@/pages/SemuaProdukPage";
import useFetch from "@/hooks/useFetch";

export default function BerandaPage() {
  const { data: courseData, loading, error } = useFetch("/courses");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/Images/logo.png" alt="Video Belajar Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/semua-produk">Kategori</Link>
          <div className="avatar-dropdown">
            <img
              src="/Images/musk.jpg"
              alt="Avatar"
              className="avatar"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/profil" onClick={() => setIsDropdownOpen(false)}>Profil Saya</Link>
                <Link to="/kelas" onClick={() => setIsDropdownOpen(false)}>Kelas Saya</Link>
                <Link to="/pesanan" onClick={() => setIsDropdownOpen(false)}>Pesanan Saya</Link>
                <button onClick={handleLogout} className="logout-link">Keluar ↩</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="page-content-wrapper">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>
                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
              </h1>
              <p>
                Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
                pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
                berpartisipasi dalam latihan interaktif yang akan meningkatkan
                pemahaman Anda.
              </p>
              <a href="#" className="btn-cta">Temukan Video Course untuk Dipelajari!</a>
            </div>
          </div>
        </section>

        {/* Kategori dan Video Section */}
        <section className="main-content">
          <h2>Koleksi Video Pembelajaran Unggulan</h2>
          <p className="section-description">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>

          <div className="category-tabs">
            <button className="active">Semua Kelas</button>
            <button>Pemasaran</button>
            <button>Desain</button>
            <button>Pengembangan Diri</button>
            <button>Bisnis</button>
          </div>

          {/* Feedback Loading & Error */}
          {loading && <p className="text-center text-gray-500 mt-6">Memuat data dari server...</p>}
          {error && <p className="text-center text-red-500 mt-6">Terjadi kesalahan: {error.message}</p>}

          {/* Data tampil hanya jika tidak loading & tidak error */}
          {!loading && !error && (
            <div className="card-grid">
              {courseData.map((course, index) => (
                <div key={index} className="course-card">
                  <img src={course.image} alt="Thumbnail" className="course-thumbnail" />
                  <div className="card-body">
                    <h3>{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="instructor-info">
                      <img src={course.instructorImg} alt="Avatar" className="instructor-avatar" />
                      <div className="instructor-details">
                        <p className="instructor-name">{course.instructorName}</p>
                        <p className="instructor-title">{course.instructorTitle}</p>
                      </div>
                    </div>
                    <div className="meta">
                      <div className="rating">
                        <span>{course.rating}</span>
                        <span className="rating-value">{course.ratingValue}</span>
                        <span className="review-count">{course.reviewCount}</span>
                      </div>
                      <div className="price-info">
                        <span className="original-price">{course.originalPrice}</span>
                        <span className="discount-price">{course.discountPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Newsletter */}
        <section className="newsletter">
          <div className="newsletter-content">
            <p className="newsletter-tag">NEWSLETTER</p>
            <h2>Mau Belajar Lebih Banyak?</h2>
            <p className="newsletter-description">
              Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
            </p>
            <form>
              <input type="email" placeholder="Masukkan Emailmu" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Images/logo.png" alt="videobelajar Logo" className="footer-logo" />
            <p className="tagline">Gali Potensi Anda Melalui Pembelajaran <br /> Video di hariesok.id!</p>
            <p className="address">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
            <p className="phone">+62-877-7123-1234</p>
          </div>

          <div>
            <h4>Kategori</h4>
            <ul>
              <li><a href="#">Digital & Teknologi</a></li>
              <li><a href="#">Pemasaran</a></li>
              <li><a href="#">Manajemen Bisnis</a></li>
              <li><a href="#">Pengembangan Diri</a></li>
              <li><a href="#">Desain</a></li>
            </ul>
          </div>
          <div>
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Ketentuan Layanan</a></li>
              <li><a href="#">Bantuan</a></li>
            </ul>
          </div>
          <div>
            <h4>Komunitas</h4>
            <ul>
              <li><a href="#">Tips Sukses</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">@2023 Gerobok Sayur All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#" aria-label="LinkedIn"><img src="/Images/Sosmed-kecil/Linkedin.png" alt="LinkedIn" /></a>
            <a href="#" aria-label="Facebook"><img src="/Images/Sosmed-kecil/Facebook.png" alt="Facebook" /></a>
            <a href="#" aria-label="Instagram"><img src="/Images/Sosmed-kecil/Instagram.png" alt="Instagram" /></a>
            <a href="#" aria-label="Twitter"><img src="/Images/Sosmed-kecil/Twitter.png" alt="Twitter" /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
