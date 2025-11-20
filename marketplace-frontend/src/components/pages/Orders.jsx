import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../../redux/orderSlice";
import OrderDetailModal from "../common/OrderDetailModal"; // Asegúrate de la ruta correcta

export default function Orders() {
  // ... (Estados y useEffect se mantienen igual) ...

  const { currentUserOrders: orders, loading } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    // Cuando se presiona el botón, pasamos el OBJETO COMPLETO del pedido.
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white text-center">
        <p className="text-xl">Cargando tus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-4xl font-extrabold mb-4 border-b-2 border-green-500 pb-2">
        Mis Pedidos
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gray-800 rounded-lg mt-10 shadow-xl">
          <p className="text-4xl mb-4" role="img" aria-label="caja vacía">
            📦
          </p>
          <p className="text-xl font-semibold text-gray-300 mb-2">
            Aún no tienes pedidos realizados.
          </p>
          <p className="text-gray-400">
            ¡Explora nuestro catálogo y comienza tu primera compra!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="
                bg-gray-800 p-5 rounded-xl shadow-lg 
                border-l-4 border-green-500 
                hover:bg-gray-700 transition duration-300
              "
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-bold text-green-400">
                  Pedido #{o.id}
                </p>
                <button
                  onClick={() => handleViewDetails(o)} // ⬅️ Pasar el objeto 'o' completo
                  className="
                    bg-blue-600 hover:bg-blue-700 text-white 
                    text-sm font-medium px-4 py-2 rounded-full 
                    transition duration-200
                  "
                >
                  Ver Detalles
                </button>
              </div>

              <div className="border-t border-gray-700 pt-3 flex justify-between text-lg">
                <p className="font-semibold text-gray-300">
                  Total Pagado:
                  <span className="text-green-500 ml-2">
                    ${(o.totalPrice || 0).toFixed(2)}
                  </span>
                </p>

                <p className="text-sm text-gray-400">
                  Fecha: {new Date(o.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
