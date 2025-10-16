import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/api";

export default function AdminCreateGame() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [platform, setPlatform] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  // Cargar categorías del backend
  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  // Manejo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("precio", price);
    formData.append("stock", stock);
    formData.append("plataforma", platform);
    formData.append("categoriaId", categoryId);
    formData.append("imagen", image); // clave igual a la que espera el backend

    try {
      const response = await fetch("http://localhost:4002/games/admin/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("🎮 Videojuego creado con éxito");
        // limpiar formulario
        setTitle("");
        setPrice("");
        setStock("");
        setPlatform("");
        setCategoryId("");
        setImage(null);
        setPreview(null);
      } /* else {
        alert("❌ Error al crear el videojuego");
      } */
    } catch (error) {
      console.error("Error al enviar:", error);
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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block font-medium mb-1">Precio ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Plataforma */}
        <div>
          <label className="block font-medium mb-1">Plataforma</label>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
          <label className="block font-medium mb-1">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="mt-3 w-48 h-48 object-cover rounded-lg"
            />
          )}
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
