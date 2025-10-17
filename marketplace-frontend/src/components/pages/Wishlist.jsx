import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import GameCard from '../common/GameCard';

export default function Wishlist() {
  const { wishlist, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-white text-center p-10">Cargando tu lista...</div>;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Tu Lista de Deseados está vacía</h1>
        <p className="text-gray-400 mb-8">
          Explora el catálogo y agrega los juegos que te interesan.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-primary text-background-dark font-bold rounded-lg text-lg hover:bg-opacity-90 transition-transform hover:scale-105"
        >
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-white">Mi Lista de Deseados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {wishlist.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
