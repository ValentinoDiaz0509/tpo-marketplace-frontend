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

  if (loading) return <p>Cargando...</p>;
  if (!currentGame) return <p>Juego no encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div style={{ display: "flex", gap: 20 }}>
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
          style={{
            width: 300,
            height: 300,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <div>
          <h1 className="text-2xl font-bold">{currentGame.title}</h1>
          <p className="mt-2">{currentGame.description}</p>
          <p className="mt-4 font-bold">
            Precio: ${currentGame.finalPrice ?? currentGame.price}
          </p>
          <p>Stock disponible: {currentGame.stock}</p>
          <form onSubmit={handleAddToCart} className="mt-4">
            <label className="block">Cantidad</label>
            <input
              type="number"
              min="1"
              max={currentGame.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded p-1 w-24"
            />

            <p className="mt-3 text-sm text-gray-600">
              Este es un producto virtual — la entrega es digital, no se
              requiere dirección.
            </p>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded  disabled:bg-gray-100 disabled:opacity-[0.2] disabled:text-black"
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
