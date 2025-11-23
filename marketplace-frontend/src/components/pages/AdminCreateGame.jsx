import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../redux/gameSlice";
import { fetchCategories } from "../../redux/categorySlice";

export default function AdminCreateGame() {
  const [form, setForm] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    categoriesIds: [],
    platform: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categoryList);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cargar categorías del backend
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

    const gameData = {
      title: form.title,
      price: parseFloat(form.price),
      discount: parseFloat(parseInt(form.discount) / 100 || 0.0),
      stock: parseInt(form.stock, 10),
      platform: form.platform,
      categoriesIds: form.categoriesIds,
    };

    dispatch(createGame({ gameData: gameData, imageFile }));
  };

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-8 text-white">
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
            className="w-full border rounded-lg p-2 text-black"
            placeholder="Ej: Hogwarts Legacy"
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
            className="w-full border rounded-lg p-2 text-black"
            placeholder="Ej: 30"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Descuento (%)</label>
          <input
            name="discount"
            className="w-full border rounded-lg p-2 text-black"
            type="number"
            onChange={handleChange}
            placeholder="Ej: 20"
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
            className="w-full border rounded-lg p-2 text-black"
            placeholder="Ej: 100"
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
            className="w-full border rounded-lg p-2 text-black"
            placeholder="Ej: PC"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <select
            name="categoriesIds"
            onChange={handleChange}
            className="w-full border rounded-lg p-2 text-black"
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
            className="w-full border rounded-lg p-2 text-black mb-2"
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
