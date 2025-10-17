import { useEffect, useState } from "react";
import { fetchOrdersAPI } from "../../utils/api";
import { Link } from "react-router-dom";

// Componente para el estado de un pedido
const OrderStatusBadge = ({ status }) => {
    const statusMap = {
      COMPLETADO: "bg-green-500/20 text-green-400",
      PENDIENTE: "bg-yellow-500/20 text-yellow-400",
      CANCELADO: "bg-red-500/20 text-red-400",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-500/20 text-gray-400'}`}>
        {status}
      </span>
    );
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Para controlar qué pedido se expande

  useEffect(() => {
    fetchOrdersAPI()
      .then(setOrders)
      .catch(() => setError("Error al cargar tus pedidos."))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleOrder = (orderId) => {
    // Si el pedido clickeado ya está abierto, lo cerramos. Si no, lo abrimos.
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };
  
  if (loading) return <p className="text-white text-center p-10">Cargando tus pedidos...</p>;
  if (error) return <p className="text-red-500 text-center p-10">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Aún no tienes pedidos</h1>
        <p className="text-gray-400 mb-8">¡Los juegos que compres aparecerán aquí!</p>
        <Link to="/" className="inline-block px-8 py-3 bg-primary text-background-dark font-bold rounded-lg text-lg hover:bg-opacity-90">
          Explorar Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-white">Mis Compras</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-component-dark rounded-lg overflow-hidden border border-gray-700">
            {/* Encabezado del Pedido (siempre visible) */}
            <div onClick={() => handleToggleOrder(order.id)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800/50">
              <div>
                <p className="text-lg font-bold text-white">Pedido #{order.id}</p>
                <p className="text-sm text-gray-400">Fecha: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">${order.totalPrice.toFixed(2)}</p>
                <OrderStatusBadge status={order.status} />
              </div>
              <span className={`material-symbols-outlined text-white transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>

            {/* Detalle del Pedido (visible solo si está expandido) */}
            {expandedOrderId === order.id && (
              <div className="bg-background-dark p-4 border-t border-gray-700">
                <h3 className="font-bold text-white mb-2">Juegos en este pedido:</h3>
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.gameId} className="flex items-center gap-4">
                      <img src={item.gameImageUrl} alt={item.gameTitle} className="w-24 h-16 object-cover rounded-md" />
                      <div>
                        <p className="text-white font-medium">{item.gameTitle}</p>
                        <p className="text-gray-400 text-sm">Precio: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
