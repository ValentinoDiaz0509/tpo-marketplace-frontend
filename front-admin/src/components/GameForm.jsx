import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../api/api';

export default function GameForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '', // Campo para el precio con descuento
    genre: '',
    imageUrl: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchData(`/games/${id}`)
        .then((gameData) => {
          setForm(gameData);
        })
        .catch(() => alert('Error al cargar los datos del juego'));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aseguramos que discountPrice sea 0 si está vacío
      const body = { ...form, discountPrice: form.discountPrice || 0 };
      
      if (isEditing) {
        await fetchData(`/games/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
        alert('Juego actualizado con éxito');
      } else {
        await fetchData('/games', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        alert('Juego creado con éxito');
      }
      navigate('/games');
    } catch (error) {
      alert('Error al guardar el juego');
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Juego' : 'Crear Nuevo Juego'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', minHeight: '80px' }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Precio Original</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Precio con Descuento (opcional)</label>
            <input name="discountPrice" type="number" step="0.01" value={form.discountPrice} onChange={handleChange} style={{ width: '100%' }} placeholder="0" />
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Género</label>
          <select name="genre" value={form.genre} onChange={handleChange} required style={{ width: '100%' }}>
            <option value="">Selecciona un género</option>
            <option value="ACCION">Acción</option>
            <option value="AVENTURA">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="DEPORTES">Deportes</option>
            <option value="ESTRATEGIA">Estrategia</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>URL de la Imagen</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <button type="submit">{isEditing ? 'Actualizar Juego' : 'Guardar Juego'}</button>
      </form>
    </div>
  );
}
