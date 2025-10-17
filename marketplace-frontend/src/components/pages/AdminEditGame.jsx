import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchCategoriesAPI, fetchGameForEditAPI, updateGameAPI } from "../../utils/api";

export default function AdminEditGame() {
  const { id } = useParams(); // Obtiene el ID del juego desde la URL
  const navigate = useNavigate();

  // Estados del formulario
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    status: "",
    releaseDate: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // 1. Cargar categorías y los datos del juego a editar
  useEffect(() => {
    // Cargar categorías
    fetchCategoriesAPI()
      .then(data => setCategories(data.content || data))
      .catch(() => setFeedback({ message: 'Error al cargar categorías', type: 'error' }));

    // Cargar datos del juego
    fetchGameForEditAPI(id)
      .then(data => {
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          status: data.status || "Activo",
          releaseDate: data.releaseDate ? new Date(data.releaseDate).toISOString().split('T')[0] : "",
          categoryId: data.categories?.[0]?.id || "",
        });
        setExistingImageUrl(data.imageUrl || '');
      })
      .catch(() => setFeedback({ message: 'Error al cargar los datos del juego', type: 'error' }));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 2. Lógica de envío adaptada de tu código original
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    try {
      let response;
      if (imageFile) {
        // Si hay una imagen nueva, enviamos FormData
        const formData = new FormData();
        // El backend espera una parte 'game' con el JSON y una parte 'image' con el archivo
        formData.append('game', new Blob([JSON.stringify(form)], { type: 'application/json' }));
        formData.append('image', imageFile);
        response = await updateGameAPI(id, formData);
      } else {
        // Si no hay imagen nueva, enviamos solo JSON
        response = await updateGameAPI(id, form);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar');
      }

      alert("✅ Videojuego actualizado correctamente");
      navigate("/admin/games");
    } catch (error) {
      setFeedback({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="w-full max-w-4xl rounded-xl bg-modal-background-dark text-white shadow-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-white/10">
          <p className="text-2xl font-bold">Editar Juego</p>
          <Link to="/admin/games" className="flex items-center justify-center rounded-lg h-10 w-10 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>
        <div className="p-6">
          {feedback.message && <div className={`p-3 rounded-lg mb-4 text-center ${feedback.type === 'error' ? 'bg-red-500/20 text-red-400' : ''}`}>{feedback.message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6">
                <label className="flex flex-col">
                    <p className="text-base font-medium pb-2 text-white/80">Título del Juego</p>
                    <input name="title" value={form.title} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" required />
                </label>
                <label className="flex flex-col">
                    <p className="text-base font-medium pb-2 text-white/80">Descripción</p>
                    <textarea name="description" value={form.description} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 min-h-36 p-3"></textarea>
                </label>
                <label className="flex flex-col">
                    <p className="text-base font-medium pb-2 text-white/80">Categoría</p>
                    <select name="categoryId" value={form.categoryId} onChange={handleChange} className="form-select rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" required>
                        <option value="">Seleccione una categoría</option>
                        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </label>
                <label className="flex flex-col">
                    <p className="text-base font-medium pb-2 text-white/80">Precio</p>
                    <input name="price" value={form.price} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" type="number" step="0.01" required />
                </label>
            </div>
            {/* Columna Derecha */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Carátula del Juego</p>
                {/* 3. Lógica de previsualización de imagen */}
                <div className="w-full h-48">
                  {preview ? (
                    <img src={preview} alt="Vista previa nueva" className="w-full h-full object-contain rounded-lg" />
                  ) : existingImageUrl ? (
                    <img src={existingImageUrl} alt="Imagen actual" className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <div className="w-full h-full bg-[#2b3418] rounded-lg flex items-center justify-center text-white/40">Sin imagen</div>
                  )}
                </div>
                <label htmlFor="dropzone-file" className="text-sm text-primary hover:underline cursor-pointer mt-2 text-center">Cambiar imagen</label>
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Estado</p>
                <select name="status" value={form.status} onChange={handleChange} className="form-select rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Fecha de Lanzamiento</p>
                <input name="releaseDate" value={form.releaseDate} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" type="date" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 p-6 border-t border-white/10">
          <Link to="/admin/games" className="px-6 h-11 flex items-center rounded-lg bg-transparent text-white/70 hover:bg-white/10 text-sm font-bold">Cancelar</Link>
          <button type="submit" className="px-6 h-11 flex items-center rounded-lg bg-primary text-background-dark text-sm font-bold transition-transform hover:scale-105">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}
