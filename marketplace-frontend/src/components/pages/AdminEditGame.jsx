import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from 'react-toastify';

export default function AdminEditGame() {
    // --- LÓGICA ---
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({ title: '', description: '', price: '', categoryId: '', status: '', releaseDate: '' });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga los datos iniciales (categorías y el juego a editar)
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar categorías
                const categoriesData = await fetchData("/categories");
                setCategories(categoriesData.content || categoriesData);

                // Cargar datos del juego específico
                const gameData = await fetchData(`/games/admin/${id}`);
                setForm({
                    title: gameData.title || "",
                    description: gameData.description || "",
                    price: gameData.price || "",
                    status: gameData.status || "Activo",
                    releaseDate: gameData.releaseDate ? new Date(gameData.releaseDate).toISOString().split('T')[0] : "",
                    categoryId: gameData.categories?.[0]?.id || "",
                });
                setExistingImageUrl(gameData.imageUrl || '');
            } catch (error) {
                toast.error("Error al cargar los datos necesarios.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('gameData', new Blob([JSON.stringify(form)], { type: 'application/json' }));
        if (imageFile) {
            formData.append('imagen', imageFile);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/games/admin/${id}`, { // Usa el endpoint de UPDATE
                method: "PUT",
                headers: { ...(token && { "Authorization": `Bearer ${token}` }) },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el videojuego');
            }
            
            toast.success("✅ ¡Videojuego actualizado con éxito!");
            navigate("/admin/games");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return <p className="text-white text-center p-10">Cargando datos del juego...</p>;
    }

    // --- DISEÑO (JSX) ---
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
                                <div className="w-full h-48 bg-[#2b3418] rounded-lg flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="Vista previa nueva" className="w-full h-full object-contain rounded-lg" />
                                    ) : existingImageUrl ? (
                                        <img src={existingImageUrl} alt="Imagen actual" className="w-full h-full object-contain rounded-lg" />
                                    ) : (
                                        <span className="text-white/40">Sin imagen</span>
                                    )}
                                </div>
                                <label htmlFor="dropzone-file" className="text-sm text-primary hover:underline cursor-pointer mt-2 text-center">Cambiar imagen (opcional)</label>
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
                    <Link to="/admin/games" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-transparent text-white/70 hover:bg-white/10 text-sm font-bold">
                        <span className="truncate">Cancelar</span>
                    </Link>
                    <button type="submit" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-background-dark text-sm font-bold transition-transform hover:scale-105">
                        <span className="truncate">Guardar Cambios</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
