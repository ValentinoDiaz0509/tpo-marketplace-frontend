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
  const [categories, setCategories] = useState([]);

  // Carga inicial de todos los juegos.
  useEffect(() => {
    fetchData("/games/get/available")
      .then((data) => {
        setGames(data);
      })
      .catch(() => alert("Error al cargar juegos"));

    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
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
    <div className="px-[50px] mb-[4rem]">
      <h2 className="my-[20px] text-[30px]">Catálogo de Juegos</h2>

      {/* Formulario con filtros */}
      <form style={{ marginBottom: "2rem" }}>
        <div className="flex gap-[3rem]">
          <input
            type="text"
            placeholder="Buscar juego por nombre..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, minWidth: "200px", maxWidth: "400px" }}
            className="min-w-[200px] max-w-[400px] border border-[2px] border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32]"
          />

          {/* Select para Género */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#32CD32] p-1"
          >
            <option value="">Todos los géneros</option>
            {categories.map((cat) => (
              <option value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* 2. Filtro de Rango de Precio */}
          <input
            type="number"
            placeholder="Precio Mín."
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-[120px] border border-[2px] border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32]"
          />
          <input
            type="number"
            placeholder="Precio Máx."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-[120px] border border-[2px] border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32]"
          />
        </div>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {filteredGames.length > 0 ? (
          filteredGames.map((g) => <GameCard key={g.id} game={g} />)
        ) : (
          <p>No se encontraron juegos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
}
