import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../../redux/orderSlice";
import OrderDetailModal from "../common/OrderDetailModal"; // Asumiendo que esta ruta es correcta

export default function Orders() {
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
    <div className="p-4 sm:p-8 md:p-12 max-w-5xl mx-auto my-8 text-white">
      <h2 className="text-4xl font-extrabold mb-6 border-b-2 border-[#32CD32] pb-2">
        Historial de Pedidos
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gray-800 rounded-lg mt-10 shadow-xl">
          <p className="text-4xl mb-4" role="img" aria-label="caja vacía">
            📦
          </p>
          <p className="text-xl font-semibold text-gray-300 mb-2">
            Aún no tienes pedidos realizados.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="
                bg-gray-800 p-5 rounded-xl shadow-lg 
                border-l-4 border-[#32CD32] 
                hover:bg-gray-700 transition duration-300
              "
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <p className="text-xl font-bold text-[#32CD32]">
                  Pedido #{o.id}
                </p>
                <button
                  onClick={() => handleViewDetails(o)}
                  className="
                    bg-blue-600 hover:bg-blue-700 text-white 
                    text-sm font-medium px-4 py-2 rounded-full 
                    transition duration-200 mt-2 sm:mt-0
                  "
                >
                  Ver Detalles
                </button>
              </div>

              <div className="border-t border-gray-700 pt-3 flex flex-col sm:flex-row justify-between text-lg">
                <p className="font-semibold text-gray-300">
                  Total Pagado:
                  <span className="text-green-500 ml-2">
                    ${(o.totalPrice || 0).toFixed(2)}
                  </span>
                </p>

                <p className="text-sm text-gray-400 mt-1 sm:mt-0">
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
