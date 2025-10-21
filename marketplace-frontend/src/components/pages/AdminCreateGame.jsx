import React, { useState, useEffect } from "react";
import { fetchData, API_URL } from "../../utils/api";

export default function AdminCreateGame() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    discount: "",
    stock: "",
    categoriesIds: [],
    platform: "",
    imageUrl: "",
  });

  /* const [preview, setPreview] = useState(null); */
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cargar categorías del backend
  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "categoriesIds") {
      // multi-select: obtener todos los options seleccionados
      const selected = e.target.selectedOptions;
      const values = Array.from(selected).map((opt) => parseInt(opt.value, 10));
      setForm({ ...form, [name]: values });
      return;
    }

    // para el resto de campos
    let value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      let created;

      // If an image file was selected, upload as multipart to the backend endpoint
      if (imageFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("price", form.price);
        formData.append("discount", form.discount || 0);
        formData.append("stock", form.stock);
        formData.append("platform", form.platform);
        // append categoriesIds as multiple fields
        (form.categoriesIds || []).forEach((id) =>
          formData.append("categoriesIds", id)
        );
        formData.append("imagen", imageFile);

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/games/admin/create-with-image`, {
          method: "POST",
          body: formData,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) throw new Error(`Error ${res.status}`);
        created = await res.json();
      } else {
        created = await fetchData("/games/admin/create", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      // Si el backend devuelve el objeto creado, asumimos éxito
      if (created) {
        alert("🎮 Videojuego creado con éxito");
      }
    } catch (error) {
      console.error("Error al enviar:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-[3rem]">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
          <label className="block font-medium mb-1">Descuento</label>
          <input
            name="discount"
            className="w-full border rounded-lg p-2"
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
            multiple
            size={Math.min(6, categories.length || 6)}
            required
          >
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
          <label className="block font-medium mb-1">Imagen (URL)</label>
          <input
            name="imageUrl"
            type="text"
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="O pegá una URL directa aquí si ya la tenés"
          />

          <div className="mt-2">
            <label className="block font-medium mb-1">O subir imagen</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-48 h-48 object-cover rounded-lg"
            />
          )}
          {form.imageUrl && !preview && (
            <img
              src={
                form.imageUrl.startsWith("http")
                  ? encodeURI(form.imageUrl)
                  : encodeURI(`http://localhost:4002${form.imageUrl}`)
              }
              alt="Preview URL"
              className="mt-3 w-48 h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Videojuego
        </button>
      </form>
    </div>
  );
}
