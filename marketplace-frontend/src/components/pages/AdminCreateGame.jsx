import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchData } from "../../utils/api"; // Solo para cargar categorías

export default function AdminCreateGame() {
  // Estados para cada campo del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("Activo");
  const [releaseDate, setReleaseDate] = useState("");
  
  const [feedback, setFeedback] = useState({ message: '', type: ''});
  const navigate = useNavigate();

  // Cargar categorías del backend al montar el componente
  useEffect(() => {
    fetchData("/categories")
      .then((data) => setCategories(data.content || data)) // Compatible con distintas respuestas
      .catch(() => setFeedback({ message: 'Error al cargar categorías', type: 'error' }));
  }, []);

  // Manejo de la selección de imagen y su previsualización
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: ''});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("status", status);
    formData.append("releaseDate", releaseDate);
    if (image) {
      formData.append("imagen", image); // La clave "imagen" debe coincidir con el backend
    }

    try {
      // Usamos fetch directamente porque enviamos FormData, no JSON
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4002/games/admin/create", {
        method: "POST",
        headers: {
            ...(token && { "Authorization": `Bearer ${token}` })
            // No se especifica 'Content-Type', el navegador lo hace por nosotros con FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el videojuego');
      }
      
      alert("🎮 Videojuego creado con éxito");
      navigate("/admin/games"); // Redirigir a la lista

    } catch (error) {
      setFeedback({ message: error.message, type: 'error' });
      console.error("Error al enviar:", error);
    }
  };

  return (
    // Para simplificar, mostramos el formulario directamente, con el estilo de un modal
    <div className="w-full max-w-4xl rounded-xl bg-modal-background-dark text-white shadow-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-white/10">
          <p className="text-2xl font-bold">Añadir Nuevo Juego</p>
          <Link to="/admin/games" className="flex items-center justify-center rounded-lg h-10 w-10 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>

        <div className="p-6">
          {feedback.message && (
            <div className={`p-3 rounded-lg mb-4 text-center ${feedback.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {feedback.message}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6">
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Título del Juego</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" placeholder="Ingrese el título" required />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Descripción</p>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 min-h-36 p-3" placeholder="Ingrese la descripción"></textarea>
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Categoría</p>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-select rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" required>
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Precio</p>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" type="number" step="0.01" placeholder="Ingrese el precio" required />
              </label>
            </div>

            {/* Columna Derecha */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Cargar Carátula</p>
                {preview ? (
                  <div className="text-center">
                    <img src={preview} alt="Vista previa" className="w-full h-48 object-contain rounded-lg mb-2" />
                    <button type="button" onClick={() => { setImage(null); setPreview(null); }} className="text-sm text-red-400 hover:text-red-300">Quitar imagen</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-[#2b3418] hover:bg-white/5 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-4xl text-white/60">cloud_upload</span>
                        <p className="mb-2 text-sm text-white/60"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                    </label>
                  </div>
                )}
              </div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Estado</p>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3">
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-white/80">Fecha de Lanzamiento</p>
                <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" type="date" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 p-6 border-t border-white/10">
          <Link to="/admin/games" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-transparent text-white/70 hover:bg-white/10 text-sm font-bold">
            <span className="truncate">Cancelar</span>
          </Link>
          <button type="submit" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-background-dark text-sm font-bold transition-transform hover:scale-105">
            <span className="truncate">Guardar Juego</span>
          </button>
        </div>
      </form>
    </div>
  );
}
