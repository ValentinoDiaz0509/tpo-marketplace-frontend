import React, { useState, useEffect } from "react";

export default function CreteGame() {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Cargar categorías del backend
  useEffect(() => {
    fetch("http://localhost:8080/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  // Manejo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("plataforma", plataforma);
    formData.append("categoriaId", categoriaId);
    formData.append("imagen", imagen); // clave igual a la que espera el backend

    try {
      const response = await fetch("http://localhost:8080/api/videojuegos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("🎮 Videojuego creado con éxito");
        // limpiar formulario
        setTitulo("");
        setPrecio("");
        setStock("");
        setPlataforma("");
        setCategoriaId("");
        setImagen(null);
        setPreview(null);
      } else {
        alert("❌ Error al crear el videojuego");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Crear Nuevo Videojuego
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block font-medium mb-1">Precio ($)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
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
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
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
