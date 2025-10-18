import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from 'react-toastify';

export default function AdminCreateGame() {
    // --- LÓGICA ---
    const [form, setForm] = useState({ title: '', description: '', price: '', categoryId: '', status: 'Activo', releaseDate: '' });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("/categories")
            .then(data => setCategories(data.content || data))
            .catch(() => toast.error('Error al cargar categorías'));
    }, []);

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
        if (!imageFile) {
            toast.error("Por favor, selecciona una imagen para el juego.");
            return;
        }

        const formData = new FormData();
        // El backend espera una parte 'gameData' con el JSON y una parte 'imagen' con el archivo
        formData.append('gameData', new Blob([JSON.stringify(form)], { type: 'application/json' }));
        formData.append('imagen', imageFile);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/games/admin/create", {
                method: "POST",
                headers: { ...(token && { "Authorization": `Bearer ${token}` }) },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el videojuego');
            }
            
            toast.success("🎮 ¡Videojuego creado con éxito!");
            navigate("/admin/games");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // --- DISEÑO (JSX) ---
    return (
        <div className="w-full max-w-4xl rounded-xl bg-modal-background-dark text-white shadow-2xl mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-white/10">
                    <p className="text-2xl font-bold">Añadir Nuevo Juego</p>
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
                                <input name="title" value={form.title} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" placeholder="Ingrese el título" required />
                            </label>
                            <label className="flex flex-col">
                                <p className="text-base font-medium pb-2 text-white/80">Descripción</p>
                                <textarea name="description" value={form.description} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 min-h-36 p-3" placeholder="Ingrese la descripción"></textarea>
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
                                <input name="price" value={form.price} onChange={handleChange} className="form-input rounded-lg text-white bg-[#2b3418] border-white/20 h-12 p-3" type="number" step="0.01" placeholder="Ingrese el precio" required />
                            </label>
                        </div>

                        {/* Columna Derecha */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col">
                                <p className="text-base font-medium pb-2 text-white/80">Cargar Carátula</p>
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Vista previa" className="w-full h-48 object-contain rounded-lg mb-2" />
                                        <button type="button" onClick={() => { setImageFile(null); setPreview(null); }} className="text-sm text-red-400 hover:text-red-30á00">Quitar imagen</button>
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
                        <span className="truncate">Guardar Juego</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
