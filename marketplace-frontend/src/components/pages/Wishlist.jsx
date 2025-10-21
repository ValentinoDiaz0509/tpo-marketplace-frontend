import { useState, useEffect, useContext } from "react";
import { fetchData } from "../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Objeto que contiene todos los estilos para el componente
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  h1: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  status: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "50px",
  },
  errorStatus: {
    color: "#d9534f",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
  },
  item: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
  },
  itemImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    cursor: "pointer",
  },
  itemInfo: {
    padding: "15px",
    flexGrow: 1,
  },
  itemTitle: {
    margin: "0 0 10px 0",
    fontSize: "1.1rem",
  },
  itemPrice: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  removeButton: {
    display: "block",
    width: "100%",
    padding: "12px",
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

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
      setWishlist((currentWishlist) => [
        currentWishlist.filter((game) => game.id !== gameId),
      ]);
      alert("Juego eliminado de tu lista de deseos.");
    } catch (err) {
      console.error("Error al eliminar el juego:", err);
      alert("No se pudo eliminar el juego. Inténtalo de nuevo.");
    }
  };

  if (loading)
    return <p style={styles.status}>Cargando tu lista de deseos...</p>;
  if (error)
    return <p style={{ ...styles.status, ...styles.errorStatus }}>{error}</p>;
  if (!wishlist || wishlist.length === 0) {
    return <p style={styles.status}>Tu lista de deseos está vacía.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Mi Lista de Deseos</h1>
      <div style={styles.grid}>
        {wishlist.map((game) => (
          <div key={game.id} style={styles.item}>
            <Link to={`/detail/${game.id}`}>
              <img
                style={styles.itemImage}
                src={
                  game.imageUrl
                    ? encodeURI(game.imageUrl)
                    : "/placeholder-game.png"
                }
                alt={game.name}
              />
            </Link>
            <div style={styles.itemInfo}>
              <h3 style={styles.itemTitle}>{game.name}</h3>
              <p style={styles.itemPrice}>
                ${(Number(game.price) || 0).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(game.id)}
              style={styles.removeButton}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
