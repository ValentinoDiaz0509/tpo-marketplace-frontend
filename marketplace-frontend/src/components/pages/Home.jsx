import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../../utils/api";
import GameCard from "../common/GameCard";

export default function Home() {
  const [games, setGames] = useState([]);

  // Estados para los filtros
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Nuevo: Precio Mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Nuevo: Precio Máximo
  const [title, setTitle] = useState("");

  // Carga inicial de todos los juegos.
  useEffect(() => {
    fetchData("/games/get/available")
      .then((data) => {
        setGames(data);
      })
      .catch(() => alert("Error al cargar juegos"));
  }, []);

  // Función de Filtrado y Ordenamiento usando useMemo
  const filteredGames = useMemo(() => {
    let currentGames = [...games]; // Usar una copia para el ordenamiento

    // 1. Filtrado por Texto (Búsqueda por nombre)
    if (title) {
      currentGames = currentGames.filter((game) =>
        game.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // 2. Filtrado por Categoría/Género
    if (category) {
      currentGames = currentGames.filter(
        (game) =>
          // 1. Aseguramos que 'categories' existe y es un array
          Array.isArray(game.categories) &&
          // 2. Usamos .some() para verificar si AL MENOS UNA categoría coincide
          game.categories.some(
            (gameCategory) =>
              // Comparamos el nombre de la categoría del juego con el filtro 'genre'
              gameCategory.name &&
              gameCategory.name.toUpperCase() === category.toUpperCase()
          )
      );
    }

    // 3. Filtrado por Rango de Precio
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) || !isNaN(max)) {
      currentGames = currentGames.filter((game) => {
        const price = game.finalPrice || 0;

        const passesMin = isNaN(min) || price >= min;
        const passesMax = isNaN(max) || price <= max;

        return passesMin && passesMax;
      });
    }

    return currentGames;
  }, [games, title, category, minPrice, maxPrice]);

  return (
    <div>
      <h2>Catálogo de Juegos</h2>

      {/* Formulario con filtros */}
      <form style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Buscar juego por nombre..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, minWidth: "200px" }}
          />

          {/* Select para Género */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            <option value="ACCION">Acción</option>
            <option value="AVENTURA">Aventura</option>
            <option value="Rol (RPG)">RPG</option>
            <option value="DEPORTES">Deportes</option>
            <option value="ESTRATEGIA">Estrategia</option>
            <option value="SIMULACION">Simulación</option>
            <option value="DEPORTES">Deportes</option>
            <option value="CARRERAS">Carreras</option>
            <option value="LUCHA">Lucha</option>
            <option value="SHOOTER (FPS)">Shooter (FPS)</option>
            <option value="PLATAFORMAS">Plataformas</option>
            <option value="TERROR">Terror</option>
            <option value="PUZZLE">Puzzle</option>
            <option value="SANDBOX">Sandbox</option>
            <option value="SURVIVAL">Survival</option>
            <option value="BATTLE_ROYALE">Battle Royale</option>
            <option value="INDIE">Indie</option>
          </select>

          {/* 2. Filtro de Rango de Precio */}
          <input
            type="number"
            placeholder="Precio Mín."
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: "100px" }}
          />
          <input
            type="number"
            placeholder="Precio Máx."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: "100px" }}
          />
        </div>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filteredGames.length > 0 ? (
          filteredGames.map((g) => <GameCard key={g.id} game={g} />)
        ) : (
          <p>No se encontraron juegos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
}
