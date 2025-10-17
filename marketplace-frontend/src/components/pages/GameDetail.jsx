import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';

export default function GameDetail() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; 

    const getGameData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`/games/get/${id}`); 
        setGame(data);
      } catch (err) {
        setError('No se pudo encontrar el juego.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGameData();
  }, [id]); 

  if (loading) {
    return <div className="text-white text-center py-20">Cargando detalles del juego...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  if (!game) {
    return <div className="text-white text-center py-20">Juego no encontrado.</div>;
  }

  return (
    <div className="text-white p-10">
      <h1>{game.title}</h1>
      <img src={game.imageUrl} alt={game.title} style={{ maxWidth: '500px', margin: '20px 0' }} />
      <p>{game.description}</p>
      <h2>${game.finalPrice}</h2>
    </div>
  );
}
