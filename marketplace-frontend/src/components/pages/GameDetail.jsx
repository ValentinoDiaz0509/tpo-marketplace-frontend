import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchGameById } from "../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";

export default function GameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.games.currentGame);
  const loading = useSelector((state) => state.games.loading);
  const [quantity, setQuantity] = useState(1);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Validación básica de stock
    if (currentGame.stock < quantity) {
        toast.error(`Stock insuficiente. Disponible: ${currentGame.stock}`);
        return;
    }
    
    const itemToAdd = {
      id: Number(id),
      title: currentGame.title,
      price: currentGame.finalPrice ?? currentGame.price,
      quantity: Number(quantity),
    };

    dispatch(addItem(itemToAdd));

    toast.success(
      `🎮 ${itemToAdd.quantity}x ${itemToAdd.title} añadido(s) al carrito.`
    );
  };

  if (loading) return <p className="text-center mt-8 text-white">Cargando...</p>;
  if (!currentGame) return <p className="text-center mt-8 text-white">Juego no encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 mt-6 text-white">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 bg-[#222222] p-6 rounded-lg shadow-xl">
        <img
          src={
            currentGame.imageUrl
              ? encodeURI(currentGame.imageUrl)
              : currentGame.imageUrl
          }
          alt={currentGame.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-game.png";
          }}
          className="w-full md:w-72 h-auto object-cover rounded-lg shadow-lg"
        />
        
        <div className="flex-1 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-3">{currentGame.title}</h1>
          <p className="mt-2 text-gray-300">{currentGame.description}</p>
          
          <p className="mt-4 text-2xl font-extrabold text-[#32CD32]">
            Precio: ${currentGame.finalPrice ?? currentGame.price}
          </p>
          <p className="text-gray-400">Stock disponible: {currentGame.stock}</p>
          
          <form onSubmit={handleAddToCart} className="mt-6">
            <label className="block font-medium mb-1">Cantidad</label>
            <input
              type="number"
              min="1"
              max={currentGame.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded p-1 w-20 text-black"
            />

            <p className="mt-3 text-sm text-gray-400">
              Este es un producto virtual — la entrega es digital, no se requiere dirección.
            </p>

            <button
              type="submit"
              className="mt-4 bg-[#32CD32] text-black px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition duration-200 disabled:opacity-30"
              disabled={role === "ADMIN"}
            >
              🛒 Añadir al Carrito
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
