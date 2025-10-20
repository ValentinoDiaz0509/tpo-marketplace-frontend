import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/api";

export default function AdminCreateGame() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    discount: "",
    stock: "",
    categoriesIds: "",
    platform: "",
    imageUrl: "",
  });

  /* const [preview, setPreview] = useState(null); */
  const [categories, setCategories] = useState([]);

  // Cargar categorías del backend
  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "categoriesIds" && value) {
      // 1. Convertir el ID a número (entero)
      const numericId = parseInt(value, 10);
      // 2. Envolverlo en un array de un solo elemento
      value = [numericId];
    } else if (name === "categoriesIds" && !value) {
      // Si la opción "Seleccionar categoría" está seleccionada
      value = [];
    }
    // Si no es categoriesIds, el valor se mantiene como string (ej. title, platform)

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const response = await fetchData("/games/admin/create", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("🎮 Videojuego creado con éxito");
      }
    } catch (error) {
      console.error("Error al enviar:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-[grey] rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Crear Nuevo Videojuego
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            name="title"
            type="text"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block font-medium mb-1">Precio ($)</label>
          <input
            name="price"
            type="number"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label>Descuento:</label>
          <input
            name="discount"
            style={{ border: "1px solid white" }}
            type="number"
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            name="stock"
            type="number"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Plataforma */}
        <div>
          <label className="block font-medium mb-1">Plataforma</label>
          <input
            name="platform"
            type="text"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <select
            name="categoriesIds"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Imagen */}
        <div>
          <label className="block font-medium mb-1">Imagen(URL)</label>
          <input
            name="imageUrl"
            type="text"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          {/* {preview && (
            <img
              src={form.imageUrl}
              alt="Vista previa"
              className="mt-3 w-48 h-48 object-cover rounded-lg"
            />
          )} */}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Videojuego
        </button>
      </form>
    </div>
  );
}
