import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

export default function PaymentForm() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no auth token, redirect to login
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Debes iniciar sesión para continuar con el pago.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // This is a mock payment form: we don't process real payments.
    // We will call the existing order endpoint with minimal payload.
    const payload = {
      address: "",
      itemList: [{ gameId: Number(gameId), quantity: Number(quantity) }],
    };
    try {
      const res = await fetchData("/order", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      // 2. REEMPLAZO: alert('Compra realizada con éxito...') -> toast.success(...)
      toast.success(
        "Compra realizada con éxito. ID de pedido: " + (res.id || "n/a")
      );
      navigate("/orders");
    } catch (err) {
      console.error("Error al procesar la compra:", err); // 3. REEMPLAZO: alert('No se pudo completar la compra:...') -> toast.error(...)
      toast.error(
        "No se pudo completar la compra: " +
          (err.message || "Error desconocido.")
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Formulario de pago</h2>
      <p className="text-sm text-gray-600 mb-4">
        Compra simulada para el juego ID: {gameId} — cantidad: {quantity}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Nombre en la tarjeta
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Número de tarjeta</label>
          <input
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="4111 1111 1111 1111"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Expiración</label>
            <input
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="MM/AA"
            />
          </div>
          <div style={{ width: 120 }}>
            <label className="block text-sm font-medium">CVV</label>
            <input
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="123"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Procesando..." : "Pagar ahora"}
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-6">
        Nota: Este formulario es sólo una simulación — no se procesan pagos
        reales.
      </p>
    </div>
  );
}
