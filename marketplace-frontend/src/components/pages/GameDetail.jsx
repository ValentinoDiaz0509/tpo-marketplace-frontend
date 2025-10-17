import { useEffect, useState, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtenemos todo lo que necesitamos del contexto
  const { token, wishlist, addGameToWishlist } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getGameData = async () => {
      setLoading(true);
      try {
        const data = await fetchData(`/games/get/${id}`);
        setGame(data);
      } catch (err) {
        setError('No se pudo encontrar el juego.');
      } finally {
        setLoading(false);
      }
    };
    getGameData();
  }, [id]);

  const isInWishlist = useMemo(() => {
    if (!game || !wishlist) return false;
    return wishlist.some(item => item.id === game.id);
  }, [wishlist, game]);

  const handleAddToWishlist = async () => {
    setIsAdding(true);
    await addGameToWishlist(game.id);
    setIsAdding(false);
  };
  
  if (loading) 
  if (error) 
  if (!game) return null;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-200">
        <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{/* ... */}</div>

            <div className="lg:col-span-1">
                <div className="bg-gray-900/50 p-6 rounded-xl flex flex-col gap-4 sticky top-24">
                    
                    
                    {token && ( 
                        <button 
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist || isAdding}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-secondary text-white gap-2 text-base font-bold transition-all disabled:bg-gray-500 disabled:cursor-not-allowed hover:brightness-110"
                        >
                            <span>
                                {isAdding ? 'Agregando...' : (isInWishlist ? 'En tu Lista' : 'Añadir a Lista de Deseados')}
                            </span>
                        </button>
                    )}

                </div>
            </div>
        </div>
    </main>
  );
}
