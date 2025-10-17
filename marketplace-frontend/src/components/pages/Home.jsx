import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../../utils/api";
import GameCard from "../common/GameCard"; 

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData("/games/get/available")
      .then((data) => setGames(data))
      .catch(() => setError("Error al cargar juegos"))
      .finally(() => setLoading(false));
  }, []);

  
  const ofertasFlash = games.slice(0, 4);
  const recomendados = games.slice(4, 8); // Tomamos otros juegos para esta sección

  if (loading) return <p className="text-white text-center text-2xl py-20">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center text-2xl py-20">{error}</p>;

  return (
    <main className="flex flex-col gap-12 py-8">
      <div className="relative w-full h-[600px] overflow-hidden">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-6516a256f2b6?q=80&w=2070&auto=format&fit=crop")' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-start p-10 md:p-16 text-white">
            <h1 className="text-6xl font-bold mb-4">Forja tu Propio Camino</h1>
            <p className="text-xl mb-8 max-w-lg">La nueva saga comienza. Explora un mundo vasto y lleno de monstruos.</p>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#84CC16] text-black text-lg font-bold leading-normal tracking-[0.015em] hover:bg-lime-500 transition-colors">
              <span className="truncate">Comprar Ahora</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-10">
        <div className="flex items-center justify-between px-4 pb-3 pt-5">
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Ofertas Flash</h2>
          {/* El contador de tiempo es estático por ahora */}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {ofertasFlash.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </div>

      <div className="px-10">
        <div className="bg-[#182634] rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vende tus Ítems</h2>
          <p className="text-[#90adcb] max-w-3xl mx-auto mb-10">Únete a miles de vendedores en Uade Games. Publica tus ítems en tres simples pasos y empieza a ganar dinero hoy mismo.</p>
          {/* ...iconos y texto de los 3 pasos... */}
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#D946EF] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-fuchsia-500/80 transition-colors mx-auto">
            <span className="truncate">Empezar a Vender</span>
          </button>
        </div>
      </div>

      <div className="px-10">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tendencias de la Comunidad</h2>
        {/* Aquí iría el carrusel o grilla de tendencias */}
      </div>

      <div className="px-10">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recomendado Para Ti</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {recomendados.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </main>
  );
}
