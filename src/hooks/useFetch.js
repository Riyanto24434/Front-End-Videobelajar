// src/hooks/useFetch.js
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(endpoint)
      .then((res) => {
        const documents = res.data.documents || [];
        const parsed = documents.map((doc) => {
          const fields = doc.fields;
          return {
            image: fields.image.stringValue,
            title: fields.title.stringValue,
            description: fields.description.stringValue,
            instructorImg: fields.instructorImg.stringValue,
            instructorName: fields.instructorName.stringValue,
            instructorTitle: fields.instructorTitle.stringValue,
            rating: fields.rating.stringValue,
            ratingValue: fields.ratingValue.stringValue,
            reviewCount: fields.reviewCount.stringValue,
            originalPrice: fields.originalPrice.stringValue,
            discountPrice: fields.discountPrice.stringValue
          };
        });
        setData(parsed);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}
