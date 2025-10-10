import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData("/order")
      .then(setOrders)
      .catch(() => alert("Error al cargar pedidos"));
  }, []);

  return (
    <div>
      <h2>Mis pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        orders.map((o) => (
          <div key={o.id}>
            <b>Pedido #{o.id}</b> — Total: ${o.totalPrice} — {o.date}
          </div>
        ))
      )}
    </div>
  );
}
