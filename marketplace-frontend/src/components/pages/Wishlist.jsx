import { useEffect } from "react";
import GameCard from "../common/GameCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/wishlistSlice";

export default function Wishlist() {
  const { wishlistGames, loading, error } = useSelector(
    (state) => state.wishlist
  );
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    // Solo carga si el userId existe (usuario logueado)
    if (userId) {
        dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  if (loading) return <p className="text-center mt-8 text-white">Cargando tu lista de deseos...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  
  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-7xl mx-auto my-8">
      <h3 className="text-3xl font-bold mb-6 text-white border-b-2 border-[#32CD32] pb-2">Mi Lista de Deseos</h3>
      
      {(!wishlistGames || wishlistGames.length === 0) ? (
        <p className="my-10 text-xl text-gray-400">Tu lista de deseos está vacía. ¡Añade algunos juegos!</p>
      ) : (
        // Grid Responsive: 2 columnas en móvil, escalando a 5 en desktop
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
