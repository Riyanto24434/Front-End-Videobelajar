// src/utils/normalizeCourse.js

export const normalizeCourse = (course) => {
  const rawPrice = Number(course?.price);
  const price = isNaN(rawPrice) ? 0 : rawPrice;
  const originalPrice = price * 2;

  return {
    image: course.image || "/Images/images-kelas/1.jpg",
    title: course.title || "Full Stack Web Developer",
    instructorImg: course.instructorImg || "/Images/Avatar Pengajar/1.png",
    instructorName: course.instructorName || "Jenna Ortega",
    instructorTitle: course.instructorTitle || "Senior Accountant di Gojek",
    ratingValue: course.ratingValue || "4.5",
    reviewCount: course.reviewCount || "(120)",
    originalPrice: course.originalPrice || `Rp ${originalPrice / 1000}K`,
    discountPrice: course.discountPrice || `Rp ${price / 1000}K`,
    duration: course.duration || "12 Jam",
  };
};
