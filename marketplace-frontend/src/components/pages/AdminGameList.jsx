import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

export default function AdminGameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData("/games/admin")
      .then((data) => {
        setGames(data);
      })
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
