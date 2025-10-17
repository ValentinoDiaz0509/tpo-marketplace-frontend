import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  const hasDiscount = game.discount && game.discount > 0;

  
  const imageUrl = game.imageUrl || 'https://via.placeholder.com/400x300'; // Una imagen por defecto

  return (
    <Link to={`/game/${game.id}`} className="block group">
      <div 
        className="flex flex-col justify-end p-4 aspect-[4/3] relative overflow-hidden rounded-lg"
        data-alt={game.title}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="relative z-10">
          <p className="text-white text-lg font-bold leading-tight line-clamp-2">{game.title}</p>
          
          <div className="flex items-center gap-2 mt-2">
            {hasDiscount ? (
              <>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{game.discount}%
                </span>
                <span className="text-lime-400 font-bold">${game.finalPrice}</span>
                <span className="text-gray-400 line-through text-sm">${game.price}</span>
              </>
            ) : (
              // Vista si NO hay descuento
              <span className="text-lime-400 font-bold">${game.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
