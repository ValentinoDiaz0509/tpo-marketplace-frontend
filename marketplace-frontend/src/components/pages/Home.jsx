import { useEffect, useMemo, useState } from "react";
import GameCard from "../common/GameCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchGamesUser } from "../../redux/gameSlice";
import { fetchCategories } from "../../redux/categorySlice";
import { fetchWishlist } from "../../redux/wishlistSlice";

export default function Home() {
    const dispatch = useDispatch();
    const games = useSelector((state) => state.games.userGameList);
    const categories = useSelector((state) => state.categories.categoryList);
    const { userId, role } = useSelector((state) => state.auth);

    // Estados para los filtros
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [title, setTitle] = useState("");

    // Carga inicial de todos los juegos.
    useEffect(() => {
        dispatch(fetchGamesUser());
        dispatch(fetchCategories());
        if (userId && role === "USER") {
            dispatch(fetchWishlist(userId));
        }
    }, [dispatch, userId, role]);

    // Función de Filtrado y Ordenamiento usando useMemo
    const filteredGames = useMemo(() => {
        let currentGames = [...games];

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
                    Array.isArray(game.categories) &&
                    game.categories.some(
                        (gameCategory) =>
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
        // 1. Padding adaptable: px-4 (móvil) a lg:px-[50px] (escritorio)
        <div className="px-4 sm:px-8 lg:px-[50px] mb-16">
            <h2 className="my-5 text-3xl font-bold">Catálogo de Juegos</h2>

            {/* Formulario con filtros */}
            <form className="mb-8">
                {/* CONTENEDOR DE FILTROS: Usa flex-wrap para apilar en móvil */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 border border-gray-700 rounded-lg">
                    <input
                        type="text"
                        placeholder="Buscar juego por nombre..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // Ocupa el ancho completo en móvil, se vuelve flexible en sm
                        className="w-full sm:w-auto sm:flex-grow border-2 border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32]"
                    />

                    {/* Select para Género */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        // Ocupa el ancho completo en móvil
                        className="w-full sm:w-auto bg-[#32CD32] p-2 text-white rounded-md cursor-pointer"
                    >
                        <option value="">Todos los géneros</option>
                        {categories.map((cat) => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option> 
                        ))}
                    </select>

                    {/* Filtro de Rango de Precio (usa calc() para dividir en móvil) */}
                    <input
                        type="number"
                        placeholder="Precio Mín."
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-[calc(50%-10px)] sm:w-[120px] border-2 border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32] flex-shrink-0"
                    />
                    <input
                        type="number"
                        placeholder="Precio Máx."
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-[calc(50%-10px)] sm:w-[120px] border-2 border-[#32CD32] rounded-md p-2 focus:ring-[#32CD32] flex-shrink-0"
                    />
                </div>
            </form>

            {/* CONTENEDOR DE JUEGOS: Implementación de la Grilla Responsive */}
            {/* grid-cols-2 (Móvil) -> sm:grid-cols-3 (Tablet) -> lg:grid-cols-4 (Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredGames.length > 0 ? (
                    filteredGames.map((g) => <GameCard key={g.id} game={g} />)
                ) : (
                    <p className="col-span-full text-center py-10 text-xl text-gray-400">
                        No se encontraron juegos que coincidan con tu búsqueda.
                    </p>
                )}
            </div>
        </div>
    );
}
