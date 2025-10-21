// src/components/pages/Orders.jsx

import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
// 1. Importar toast
import { toast } from 'react-toastify'; 

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData("/order/me")
      .then(setOrders)
      .catch(() => {
        // ⭐️ Reemplazamos el alert por toast.error
        toast.error("No se pudieron cargar tus pedidos");
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Mis pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-gray-900">No has realizado ningún pedido todavía.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-900">
                <b className="text-gray-900 font-semibold">Pedido #{o.id}</b> — Total: ${o.totalPrice} — Fecha: {new Date(o.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
