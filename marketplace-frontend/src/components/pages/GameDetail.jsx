import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/api';
// 1. Importar toast
import { toast } from 'react-toastify'; 

export default function GameDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... (Lógica de carga del juego)
    fetchData(`/games/get/${id}`)
      .then(g => setGame(g))
      .catch(() => toast.error('No se pudo cargar la información del juego')) // ⬅️ Toast para error de carga inicial
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      // Reemplazamos el alert por toast.warn o toast.error
      toast.warn('Debes iniciar sesión para completar la compra. Redirigiendo...'); 
      // Dejamos el navigate
      navigate('/login');
      return;
    }

    const payload = { address: "", itemList: [{ gameId: Number(id), quantity: Number(quantity) }] };
    console.log('Order payload:', payload);

    try{
      const res = await fetchData('/order', { 
        method: 'POST', 
        body: JSON.stringify(payload),
        // Asegúrate de que fetchData adjunta el token al header Authorization
      });

      // ⭐️ ÉXITO: Reemplazamos el alert por toast.success
      toast.success("Compra realizada con éxito");
      // Opcional: podrías sumar el ID al mensaje si es útil
      // toast.success(`Pedido creado correctamente. ID: ${res.id || 'n/a'}`);
      
      navigate('/orders');

    }catch(err){
      console.error(err);

      // Manejo de error 403 (Token inválido/expirado)
      if (err.message && err.message.includes('403')) {
        // ⭐️ ERROR 403: Reemplazamos el alert por toast.error
        toast.error('Sesión expirada o no autorizada. Por favor inicia sesión nuevamente.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      // ⭐️ ERROR GENERAL: Reemplazamos el alert por toast.error
      toast.error("Error al procesar la compra");
    }
  }
  if(loading) return <p>Cargando...</p>;
  if(!game) return <p>Juego no encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div style={{display:'flex', gap:20}}>
        <img
          src={game.imageUrl ? encodeURI(game.imageUrl) : game.imageUrl}
          alt={game.title}
          onError={(e)=>{ e.target.onerror = null; e.target.src = '/placeholder-game.png'; }}
          style={{width:300, height:300, objectFit:'cover', borderRadius:8}}
        />
        <div>
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="mt-2">{game.description}</p>
          <p className="mt-4 font-bold">Precio: ${game.finalPrice ?? game.price}</p>
          <p>Stock disponible: {game.stock}</p>
          <form onSubmit={handleBuy} className="mt-4">
            <label className="block">Cantidad</label>
            <input type="number" min="1" max={game.stock} value={quantity} onChange={e=>setQuantity(e.target.value)} className="border rounded p-1 w-24" />

            <p className="mt-3 text-sm text-gray-600">Este es un producto virtual — la entrega es digital, no se requiere dirección.</p>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Comprar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

