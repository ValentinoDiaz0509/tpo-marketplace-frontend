import { Link } from "react-router-dom";
import { addToWishlist } from "../../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GameCard({ game, inWishlist, handleRemoveItem }) {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const hasDiscount = game.discount && game.discount > 0;

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

        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          {inWishlist ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveItem({ gameId: game.id });
              }}
              className="bg-[red] text-white px-3 py-1 rounded"
              style={{ cursor: "pointer", width: "100%" }}
            >
              Eliminar
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToWishlist({ userId, gameId: game.id }));
              }}
              className="bg-[#32CD32] text-black px-3 py-1 rounded"
              style={{ cursor: "pointer", width: "100%" }}
            >
              Añadir a wishlist
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
