import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GameCard({ game }) {
  const { userId, role } = useSelector((state) => state.auth);
  const wishlistGames = useSelector((state) => state.wishlist.wishlistGames);
  const dispatch = useDispatch();

  const isGameInWishlist = wishlistGames.some((item) => item.id === game.id);
  const hasDiscount = game.discount && game.discount > 0;

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // Previene la navegación del Link

    if (!userId) {
      // Opcional: Redirigir a login o mostrar toast
      console.error("Usuario no autenticado");
      return;
    }

    const payload = { userId, gameId: game.id };

    if (isGameInWishlist) {
      // 2. Si ya está, despachar removeFromWishlist
      dispatch(removeFromWishlist(payload));
    } else {
      // 3. Si no está, despachar addToWishlist
      // Nota: El thunk addToWishlist no actualiza el estado local (state.wishlistGames),
      // por lo que después de agregar, probablemente necesites volver a cargar la lista,
      // o idealmente, hacer que el thunk devuelva el juego agregado para que el reducer lo inserte.
      // Para mantener la consistencia con el slice actual, solo despachamos.
      dispatch(addToWishlist(payload));
    }
  };

  return (
    <Link
      to={`/detail/${game.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #333",
          backgroundColor: "#222222",
          borderRadius: "8px",
          padding: "1rem",
          width: "250px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="h-[250px]">
          <img
            src={game.imageUrl ? encodeURI(game.imageUrl) : game.imageUrl}
            alt={game.name || game.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 style={{ marginTop: "0.5rem", minHeight: "48px" }}>{game.title}</h3>
        <p style={{ margin: "0.25rem 0" }}>
          Categorías:{" "}
          {game.categories?.map((category) => category.name).join(", ")}
        </p>

        <div style={{ marginTop: "auto" }}>
          {hasDiscount ? (
            <div>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#888",
                  marginRight: "10px",
                  fontSize: "1rem",
                }}
              >
                ${(Number(game.price) || 0).toFixed(2)}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#299e44ff",
                }}
              >
                ${(Number(game.finalPrice) || 0).toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#ffffffff",
              }}
            >
              ${(Number(game.price) || 0).toFixed(2)}
            </span>
          )}
        </div>

        <div
          style={{ marginTop: 8, display: "flex", gap: 8 }}
          className={role === "ADMIN" && ""}
        >
          <button
            onClick={handleToggleWishlist}
            className={
              isGameInWishlist
                ? "bg-[red] text-white px-3 py-1 rounded disabled:bg-gray-100 disabled:opacity-[0.2] disabled:text-black" // Estilo para Eliminar
                : "bg-[#32CD32] text-black px-3 py-1 rounded disabled:bg-gray-100 disabled:opacity-[0.2]" // Estilo para Añadir
            }
            style={{ cursor: "pointer", width: "100%" }}
            disabled={role === "ADMIN"}
          >
            {isGameInWishlist ? "Eliminar de Wishlist" : "Añadir a Wishlist"}
          </button>
        </div>
      </div>
    </Link>
  );
}
