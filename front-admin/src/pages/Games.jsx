import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData("/games")
      .then(setGames)
      .catch(() => alert("Error al cargar juegos"));
  }, []);

  return (
    <div>
      <h2>Juegos</h2>
      {games.map((g) => (
        <div key={g.id}>
          {g.title} - ${g.price}
        </div>
      ))}
    </div>
  );
}
