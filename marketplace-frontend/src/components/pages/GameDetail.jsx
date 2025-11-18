import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";
import { fetchGameById } from "../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.games.currentGame);
  const loading = useSelector((state) => state.games.loading);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  const handleBuy = async (e) => {
    e.preventDefault();
    // Require authentication: backend only allows authenticated users to create orders
    const token = localStorage.getItem("token");
    if (!token) {
      // 2. REEMPLAZO: alert("Debes iniciar sesión...") -> toast.warn(...)
      toast.warn(
        "Debes iniciar sesión para completar la compra. Serás redirigido."
      );
      navigate("/login");
      return;
    }

    // Juegos virtuales: no se requiere dirección. Enviar cadena vacía para cumplir el contrato backend.
    const payload = {
      address: "",
      itemList: [{ gameId: Number(id), quantity: Number(quantity) }],
    };
    console.log("Order payload:", payload);
    try {
      const res = await fetchData("/order", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Pedido creado correctamente. ID: " + (res.id || "n/a"));
      navigate("/orders");
    } catch (err) {
      console.error(err);
      // If backend returns 403, likely the token is invalid/expired or user lacks permissions
      if (err.message && err.message.includes("403")) {
        toast.error("No autorizado. Por favor inicia sesión nuevamente.");
        // Remove possibly invalid token and redirect to login
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error(
        "Error al crear el pedido: " + (err.message || "Error desconocido")
      );
    }
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
          <form onSubmit={handleBuy} className="mt-4">
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
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
