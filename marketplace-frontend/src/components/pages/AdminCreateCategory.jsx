import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCategoryAPI } from "../../utils/api";

export default function AdminCreateCategory() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    if (!name.trim()) {
      setFeedback({ message: 'El nombre de la categoría no puede estar vacío.', type: 'error' });
      return;
    }

    try {
      await createCategoryAPI({ name });
      alert('✅ Categoría creada exitosamente'); // Mantenemos el alert de éxito que tenías si te es más cómodo
      navigate("/admin/categories"); // Redirige a la lista de categorías
    } catch (err) {
      setFeedback({ message: err.message || 'Error al crear la categoría.', type: 'error' });
    }
  };

  return (
    <div>
      <h1 className="text-white text-4xl font-bold tracking-tight mb-6">Añadir Nueva Categoría</h1>
      
      <div className="w-full max-w-2xl rounded-xl bg-component-dark text-white shadow-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            {feedback.message && (
              <div className={`p-3 rounded-lg mb-4 text-center text-sm ${feedback.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {feedback.message}
              </div>
            )}
            
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2 text-white/80">Nombre de la Categoría</p>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input rounded-lg text-white bg-gray-800 border-gray-700 h-12 p-3 focus:ring-primary focus:border-primary"
                placeholder="Ej: Aventura"
                required 
              />
            </label>
          </div>

          <div className="flex justify-end items-center gap-4 p-6 border-t border-white/10">
            <Link to="/admin/categories" className="px-6 h-11 flex items-center rounded-lg bg-transparent text-white/70 hover:bg-white/10 text-sm font-bold">
              Cancelar
            </Link>
            <button type="submit" className="px-6 h-11 flex items-center rounded-lg bg-primary text-white text-sm font-bold transition-transform hover:scale-105">
              Crear Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
