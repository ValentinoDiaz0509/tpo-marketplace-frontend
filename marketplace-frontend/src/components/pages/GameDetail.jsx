import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about'); 

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

  if (loading) {
    return <div className="text-white text-center py-20">Cargando detalles del juego...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }
  if (!game) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-200">
      <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <div className="relative flex items-center justify-center bg-black bg-cover bg-center aspect-video rounded-xl shadow-lg" style={{ backgroundImage: `url(${game.videoThumbnail || game.imageUrl})` }}>
            <button className="flex shrink-0 items-center justify-center rounded-full size-20 bg-black/50 text-white hover:bg-primary hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined text-5xl">play_arrow</span>
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 mt-4 bg-gray-900/50 rounded-xl">
            {(game.screenshots || []).slice(0, 4).map((ss, index) => (
              <div key={index} className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url(${ss})` }}></div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 p-6 rounded-xl flex flex-col gap-4 sticky top-24">
             <img src={game.logoUrl || ''} alt={`${game.title} logo`} className="w-full h-24 object-contain"/>
            <p className="text-gray-300 text-base">{game.shortDescription}</p>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-white">${game.finalPrice}</p>
              {game.discount > 0 && <p className="text-lg text-gray-500 line-through">${game.price}</p>}
            </div>
            <button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark gap-2 text-base font-bold hover:brightness-110 transition-all">
              <span>Añadir al Carrito</span>
            </button>
            <button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-secondary text-white gap-2 text-base font-bold hover:brightness-110 transition-all">
              <span>Añadir a la Lista de Deseados</span>
            </button>
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p><span className="font-bold text-gray-300">Desarrollador:</span> {game.developer}</p>
              <p><span className="font-bold text-gray-300">Editor:</span> {game.editor}</p>
              <p><span className="font-bold text-gray-300">Lanzamiento:</span> {new Date(game.releaseDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <div className="border-b border-gray-800">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('about')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'about' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>Acerca de este juego</button>
            <button onClick={() => setActiveTab('requirements')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'requirements' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>Requisitos del Sistema</button>
          </nav>
        </div>
        <div className="py-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Vive lo no escrito</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{game.description}</p>
            </div>
          )}
          {activeTab === 'requirements' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Requisitos del Sistema</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{game.requirements || 'No especificados.'}</p>
            </div>
          )}
        </div>
      </div>
      
    </main>
  );
}
