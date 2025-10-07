import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import GameCard from "../components/GameCard";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData("/games")
      .then(setGames)
      .catch(() => alert("Error al cargar juegos"));
  }, []);

  return (
    <div>
      <h2>Catálogo de Juegos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {games.map((g) => <GameCard key={g.id} game={g} />)}
      </div>
    </div>
  );
}
