import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/api";

const AdminEditGame = () => {
  const { id } = useParams(); // obtiene el id desde la URL (ej: /edit-game/5)

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [platform, setPlatform] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // 🔹 Cargar categorías
  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  // 🔹 Cargar datos del juego
  useEffect(() => {
    fetch(`http://localhost:4002/games/get/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setPrice(data.price);
        setStock(data.stock);
        setDiscount(data.discount);
        setPlatform(data.platform);
        setSelectedCategory(data.categories[0]?.id || "");
        setExistingImage(data.imageUrl);
      })
      .catch((err) => console.error("Error al cargar el juego:", err));
  }, [id]);

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
      categoriesIds: [parseInt(selectedCategory)],
      platform,
      discount: parseFloat(discount),
    };

    try {
      let response;
      if (imageFile) {
        // Si hay imagen nueva, usar multipart/form-data
        const formData = new FormData();
        formData.append(
          "game",
          new Blob([JSON.stringify(gameData)], { type: "application/json" })
        );
        formData.append("image", imageFile);

        response = await fetch(
          `http://localhost:4002/games/admin/${id}/edit-with-image`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        // Si no cambia la imagen
        response = await fetchData(`/games/admin/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gameData),
        });
      }

      if (response.ok) {
        alert("✅ Videojuego actualizado correctamente");
      }
    } catch (error) {
      console.error("Error al editar el videojuego:", error.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "Gray" }}
    >
      <h2>Editar videojuego</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            style={{ border: "1px solid white" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            style={{ border: "1px solid white" }}
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descuento:</label>
          <input
            style={{ border: "1px solid white" }}
            type="number"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            style={{ border: "1px solid white" }}
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Plataforma:</label>
          <input
            style={{ border: "1px solid white" }}
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Categoría:</label>
          <select
            style={{ border: "1px solid white" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Imagen (opcional):</label>
          <input
            style={{ border: "1px solid white" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {previewUrl ? (
          <div style={{ marginTop: "10px" }}>
            <img
              src={previewUrl}
              alt="Nueva vista previa"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        ) : existingImage ? (
          <div style={{ marginTop: "10px" }}>
            <img
              src={`http://localhost:4002${existingImage}`}
              alt="Imagen actual"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        ) : null}

        <button type="submit" style={{ marginTop: "15px" }}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default AdminEditGame;
