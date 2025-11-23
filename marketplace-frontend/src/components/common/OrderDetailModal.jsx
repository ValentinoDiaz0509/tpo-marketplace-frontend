import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGameById } from "../../redux/gameSlice"; // Importar la acción

export default function OrderDetailModal({ order, isOpen, onClose }) {
  const dispatch = useDispatch();

  // 🟢 Estado local para almacenar los detalles de los juegos (incluyendo el título)
  const [detailedItems, setDetailedItems] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (!isOpen || !order || !order.orderDetailResponses) {
      setDetailedItems([]);
      return;
    }

    setLoadingDetails(true);

    // 🟢 Mapear los detalles del pedido a promesas de obtención de detalles del juego
    const fetchDetailsPromises = order.orderDetailResponses.map(
      async (detail) => {
        try {
            // Disparar la acción para obtener el juego por ID.
            const actionResult = await dispatch(fetchGameById(detail.gameId));

            // La respuesta exitosa estará en actionResult.payload
            const gameData = actionResult.payload;

            return {
              ...detail,
              // 🟢 Añadir el título del juego al detalle del ítem
              title: gameData?.title || "Juego Desconocido",
            };
        } catch (error) {
            console.error(`Error fetching game ${detail.gameId}:`, error);
            return {
                ...detail,
                title: "Error al cargar"
            };
        }
      }
    );

    // Esperar a que todos los detalles de los juegos se resuelvan
    Promise.all(fetchDetailsPromises)
      .then((results) => {
        setDetailedItems(results);
      })
      .catch((err) => {
        console.error("Error al obtener detalles del juego:", err);
        setDetailedItems(
          order.orderDetailResponses.map((d) => ({
            ...d,
            title: "Error al cargar",
          }))
        );
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  }, [isOpen, order, dispatch]); // Dependencias: Si el pedido o el estado del modal cambian

  if (!isOpen || !order) return null;

  return (
    // Overlay (Fondo oscuro y fijo)
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 transition-opacity">
      {/* Contenedor del Modal */}
      <div
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto 
                   transform transition-all scale-100 opacity-100 border-2 border-green-500"
      >
        {/* Encabezado */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800">
          <h3 className="text-3xl font-bold text-green-400">
            Detalles del Pedido #{order.id}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition duration-200 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6">
          {/* Resumen del Pedido */}
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <p className="text-lg text-white mb-2">
              <span className="font-semibold text-green-500">Fecha:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
            <p className="text-xl font-bold text-white">
              <span className="font-semibold text-green-500">Total:</span> $
              {(order.totalPrice || 0).toFixed(2)}
            </p>
          </div>

          {/* Lista de Items */}
          <h4 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2 text-white">
            Productos
          </h4>

          {loadingDetails ? (
            <p className="text-gray-400">Cargando detalles de los juegos...</p>
          ) : (
            <div className="space-y-3">
              {detailedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-900 rounded-lg"
                >
                  <div className="flex flex-col mb-1 sm:mb-0">
                    {/* 🟢 Título del Juego (Ahora disponible) */}
                    <span className="font-medium text-lg text-gray-200">
                      {item.title}
                    </span>
                    {/* Cantidad y Precio Unitario */}
                    <span className="text-sm text-gray-400">
                      {item.quantity} und. @ ${(item.unitPrice || 0).toFixed(2)}{" "}
                      c/u
                    </span>
                  </div>
                  {/* Precio Total de la Línea */}
                  <span className="font-bold text-green-400 text-right">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </span>
                </div>
              ))}
              {detailedItems.length === 0 && !loadingDetails && (
                <p className="text-gray-400">
                  No hay detalles de ítems disponibles.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
