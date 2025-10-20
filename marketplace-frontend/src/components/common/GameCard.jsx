import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  // Verifica si el juego tiene un descuento válido
  const hasDiscount = game.discount && game.discount > 0;

  return (
    <Link to={`/detail/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
          src={game.imageUrl}
          alt={game.name}
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
          {game.categories.map((category) => category.name).join(", ")}
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
                {/* 👇 PRECIO ORIGINAL FORMATEADO 👇 */}
                ${(Number(game.price) || 0).toFixed(2)}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#28a745",
                }}
              >
                {/* 👇 PRECIO FINAL FORMATEADO 👇 */}
                ${(Number(game.finalPrice) || 0).toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
            >
              {/* 👇 PRECIO NORMAL FORMATEADO 👇 */}
              ${(Number(game.price) || 0).toFixed(2)}
            </span>
          )}
        </div>

        {/* El botón de añadir al carrito se puede agregar aquí en la próxima entrega */}
      </div>
    </Link>
  );
}
