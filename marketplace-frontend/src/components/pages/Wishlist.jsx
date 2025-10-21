import { useState, useEffect, useContext } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import GameCard from "../common/GameCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetchData(`/wishlist/${userId}`)
      .then((data) => {
        setWishlist(data.gameList);
        setLoading(false);
      })
      .catch(() => alert("Error al cargar wishlist"));
  }, [userId]);

  const handleRemoveItem = async (gameId) => {
    setLoading(true);
    if (
      !wishlist ||
      !window.confirm(
        "¿Estás seguro de que quieres eliminar este juego de tu lista de deseos?"
      )
    ) {
      return;
    }
    try {
      await fetchData(`/wishlist/${userId}/delete`, {
        method: "PUT",
        body: JSON.stringify({ gameId }),
      });
      setWishlist((currentWishlist) =>
        currentWishlist.filter((game) => game.id !== gameId)
      );

      alert("Juego eliminado de tu lista de deseos.");
    } catch (err) {
      console.error("Error al eliminar el juego:", err);
      alert("No se pudo eliminar el juego. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando tu lista de deseos...</p>;
  if (error) return <p>{error}</p>;
  if (!wishlist || wishlist.length === 0) {
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
        {wishlist.map((game) => (
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
