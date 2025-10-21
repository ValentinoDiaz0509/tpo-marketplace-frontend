import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchData } from "../../utils/api"; // Asegúrate de que esta ruta sea correcta

export default function GameCard({ game }) {
  // Verifica si el juego tiene un descuento válido
  const hasDiscount = game.discount && game.discount > 0;

  return (
    <Link
      to={`/detail/${game.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          width: "250px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={game.imageUrl ? encodeURI(game.imageUrl) : game.imageUrl}
          alt={game.name || game.title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
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
                  color: "#28a745",
                }}
              >
                ${(Number(game.finalPrice) || 0).toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
            >
              ${(Number(game.price) || 0).toFixed(2)}
            </span>
          )}
        </div>

        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              let wishlistId = localStorage.getItem("wishlistId");
              const token = localStorage.getItem("token");
              if (!wishlistId && token) {
                try {
                  const payload = jwtDecode(token);
                  // En muchos tokens, el ID del usuario está en 'id' o 'sub'
                  wishlistId = payload.userId;
                  if (wishlistId)
                    localStorage.setItem("wishlistId", wishlistId);
                } catch (err) {
                  console.error("Error decodificando token", err);
                }
              }

              if (!wishlistId) {
                const input = window.prompt(
                  "No se pudo determinar tu ID de wishlist. Por favor, pégalo aquí o cancela:"
                );
                if (!input) return;
                wishlistId = input.trim();
                localStorage.setItem("wishlistId", wishlistId);
              }

              try {
                // Se usan backticks (`) para insertar la variable
                await fetchData(`/wishlist/${wishlistId}/add`, {
                  method: "PUT",
                  body: JSON.stringify({ gameId: game.id }),
                });
                alert("Juego agregado a la wishlist");
              } catch (err) {
                console.error("Error agregando a wishlist", err);
                alert(
                  "No se pudo agregar a la wishlist. Revisa la consola para más detalles."
                );
              }
            }}
            className="bg-yellow-400 text-black px-3 py-1 rounded"
            style={{ cursor: "pointer", width: "100%" }}
          >
            Añadir a wishlist
          </button>
        </div>
      </div>
    </Link>
  );
}
