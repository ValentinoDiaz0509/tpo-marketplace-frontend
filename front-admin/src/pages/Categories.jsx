import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData("/categories")
      .then(setCategories)
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      {categories.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}
