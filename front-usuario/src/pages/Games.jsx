import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import GameCard from "../components/GameCard";

export default function Games() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para los filtros
  const [genre, setGenre] = useState(""); // Para el género seleccionado
  const [sortBy, setSortBy] = useState(""); // Para la opción de ordenamiento

  // Carga inicial de todos los juegos.
  useEffect(() => {
    fetchData("/games")
      .then(setGames)
      .catch(() => alert("Error al cargar juegos"));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Construcción de la URL con todos los parámetros
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (genre) {
      params.append("genre", genre);
    }
    if (sortBy) {
      params.append("sort", sortBy);
    }

    const endpoint = `/games?${params.toString()}`;

    fetchData(endpoint)
      .then(setGames)
      .catch(() => {
        alert("Error al buscar o filtrar juegos");
        setGames([]);
      });
  };

  return (
    <div>
      <h2>Catálogo de Juegos</h2>

      {/* Formulario con filtros */}
      <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Buscar juego por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
          />

          {/* Select para Género */}
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Todos los géneros</option>
            <option value="ACCION">Acción</option>
            <option value="AVENTURA">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="DEPORTES">Deportes</option>
            <option value="ESTRATEGIA">Estrategia</option>
          </select>

          {/* Select para Ordenar */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="price,asc">Precio: Menor a mayor</option>
            <option value="price,desc">Precio: Mayor a menor</option>
            <option value="name,asc">Nombre: A-Z</option>
            <option value="name,desc">Nombre: Z-A</option>
          </select>

          <button type="submit">Aplicar</button>
        </div>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {games.length > 0 ? (
          games.map((g) => <GameCard key={g.id} game={g} />)
        ) : (
          <p>No se encontraron juegos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
}
