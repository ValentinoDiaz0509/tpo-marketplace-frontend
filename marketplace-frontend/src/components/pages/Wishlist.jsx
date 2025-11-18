import { useEffect } from "react";
import GameCard from "../common/GameCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../redux/wishlistSlice";

export default function Wishlist() {
  const { wishlistGames, loading, error } = useSelector(
    (state) => state.wishlist
  );
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);

  const handleRemoveItem = async (gameId) => {
    dispatch(removeFromWishlist({ userId, gameId }));
  };

  if (loading) return <p>Cargando tu lista de deseos...</p>;
  if (error) return <p>{error}</p>;
  if (!wishlistGames || wishlistGames.length === 0) {
    return (
      <div className="px-[50px] mb-[4rem] mx-auto">
        <p className="my-[100px] text-[30px]">Tu lista de deseos está vacía.</p>
      </div>
    );
  }

  return (
    <div className="px-[50px] mb-[4rem]">
      <h3 className="my-[20px] text-[30px]">Mi Lista de Deseos</h3>
      <div className="flex gap-[3rem]">
        {wishlistGames.map((game) => (
          <GameCard
            game={game}
            inWishlist={true}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}
