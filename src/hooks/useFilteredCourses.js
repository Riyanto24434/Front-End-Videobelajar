// src/hooks/useFilteredCourses.js
import { useEffect, useState } from "react";

export default function useFilteredCourses(courses, filter) {
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    let result = [...courses];

    if (filter.selectedCategories?.length) {
      result = result.filter((course) =>
        filter.selectedCategories.some((cat) =>
          course.title.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    const min = parseInt(filter.priceRange?.min || 0);
    const max = parseInt(filter.priceRange?.max || Infinity);
    if (filter.priceRange?.min || filter.priceRange?.max) {
      result = result.filter((course) => {
        const harga = parseInt(course.discountPrice.replace(/\D/g, ""));
        return harga >= min && harga <= max;
      });
    }

    if (filter.selectedDuration) {
      if (filter.selectedDuration === "< 2 jam") {
        result = result.filter((c) => c.title.includes("1"));
      } else if (filter.selectedDuration === "2–5 jam") {
        result = result.filter((c) => c.title.includes("4"));
      } else if (filter.selectedDuration === "> 5 jam") {
        result = result.filter((c) => c.title.includes("8"));
      }
    }

    setFilteredCourses(result);
  }, [filter, courses]);

  return filteredCourses;
}
