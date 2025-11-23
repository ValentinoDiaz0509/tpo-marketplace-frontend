import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice";
import { fetchGameById, updateGame } from "../../redux/gameSlice";

const AdminEditGame = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categoryList);
  const currentGame = useSelector((state) => state.games.currentGame);
  const loading = useSelector((state) => state.games.loading);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [platform, setPlatform] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // 🔹 Cargar categorías
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // 🔹 Cargar datos del juego
  useEffect(() => {
    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentGame && currentGame.id) {
      setTitle(currentGame.title || "");
      setPrice(currentGame.price || 0);
      setStock(currentGame.stock || 0);
      setDiscount(currentGame.discount * 100 || 0);
      setPlatform(currentGame.platform || "");
      setSelectedCategories(
        (currentGame.categories || []).map((c) => String(c.id))
      );
      setExistingImage(currentGame.imageUrl || null);
    }
  }, [currentGame]);

  // 🔹 Maneja la carga de imagen nueva
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 🔹 Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameData = {
      title,
      price: parseFloat(price),
      stock: parseInt(stock),
      categoriesIds: selectedCategories.map((c) => parseInt(c)),
      platform,
      discount: parseFloat(parseInt(discount) / 100 || 0.0),
    };

    dispatch(updateGame({ id, gameData, imageFile }));
  };

  if (loading) {
    return <div className="text-center mt-8 text-white">Cargando juego...</div>;
  }

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar videojuego</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Hogwarts Legacy"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Precio ($)</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: 30"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Descuento (%)</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Ej: 15"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ej: 100"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Plataforma</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Ej: PC"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Categorías</label>
          <select
            className="w-full border rounded-lg p-2 text-black"
            multiple
            size={Math.min(6, categories.length || 3)}
            value={selectedCategories}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions).map(
                (o) => o.value
              );
              setSelectedCategories(values);
            }}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Imagen (opcional)</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* VISTA PREVIA DE IMAGEN */}
        {previewUrl ? (
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Nueva vista previa"
              className="w-full rounded-lg"
            />
          </div>
        ) : existingImage ? (
          <div className="mt-2">
            <img
              src={
                existingImage && existingImage.startsWith("http")
                  ? existingImage
                  : `http://localhost:4002${existingImage}`
              }
              alt="Imagen actual"
              className="w-full rounded-lg"
            />
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default AdminEditGame;
