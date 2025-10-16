import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

export default function AdminCategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
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
