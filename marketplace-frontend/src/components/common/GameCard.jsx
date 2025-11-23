import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GameCard({ game }) {
    const { userId, role } = useSelector((state) => state.auth);
    const wishlistGames = useSelector((state) => state.wishlist.wishlistGames);
    const dispatch = useDispatch();

    const isGameInWishlist = wishlistGames.some((item) => item.id === game.id);
    const hasDiscount = game.discount && game.discount > 0;

    const handleToggleWishlist = (e) => {
        e.preventDefault(); // Previene la navegación del Link

        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const payload = { userId, gameId: game.id };

        if (isGameInWishlist) {
            dispatch(removeFromWishlist(payload));
        } else {
            dispatch(addToWishlist(payload));
        }
    };

    return (
        <Link
            to={`/detail/${game.id}`}
            // Usamos clases para resetear el estilo del Link
            className="text-white no-underline block"
        >
            <div
                // Clase principal de la tarjeta: Adaptación a flexbox vertical, sin width fijo
                className="border border-gray-700 bg-[#222222] rounded-lg p-4 h-full flex flex-col transition duration-200 hover:shadow-lg hover:shadow-[#32CD32]/50"
            >
                {/* Contenedor de Imagen: Altura adaptable */}
                <div className="h-[200px] sm:h-[250px] mb-2">
                    <img
                        src={game.imageUrl ? encodeURI(game.imageUrl) : game.imageUrl}
                        alt={game.name || game.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* Título */}
                <h3 className="mt-2 min-h-[48px] text-lg font-semibold">{game.title}</h3>

                {/* Categorías */}
                <p className="my-1 text-sm text-gray-400">
                    Categorías:{" "}
                    {game.categories?.map((category) => category.name).join(", ")}
                </p>

                <div className="mt-auto pt-2">
                    {/* Sección de Precio */}
                    {hasDiscount ? (
                        <div className="flex items-baseline space-x-2">
                            <span
                                className="line-through text-gray-500 text-base"
                            >
                                ${(Number(game.price) || 0).toFixed(2)}
                            </span>
                            <span
                                className="font-bold text-xl text-green-500"
                            >
                                ${(Number(game.finalPrice) || 0).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span
                            className="font-bold text-xl text-white"
                        >
                            {(Number(game.price) || 0).toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Botón de Wishlist */}
                <div
                    className="mt-2 flex gap-2"
                >
                    <button
                        onClick={handleToggleWishlist}
                        className={
                            isGameInWishlist
                                ? "bg-red-600 text-white px-3 py-2 rounded font-semibold w-full disabled:bg-gray-400 disabled:opacity-50 transition duration-150" // Estilo para Eliminar
                                : "bg-[#32CD32] text-black px-3 py-2 rounded font-semibold w-full disabled:bg-gray-400 disabled:opacity-50 transition duration-150" // Estilo para Añadir
                        }
                        disabled={role === "ADMIN"}
                    >
                        {isGameInWishlist ? "Eliminar de Wishlist" : "Añadir a Wishlist"}
                    </button>
                </div>
            </div>
        </Link>
    );
}
