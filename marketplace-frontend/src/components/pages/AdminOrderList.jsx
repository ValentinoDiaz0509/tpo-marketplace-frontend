import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminOrders } from '../../redux/orderSlice';

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const { adminOrders, loading, error } = useSelector((state) => state.orders); 

  useEffect(() => {
    if (adminOrders.length === 0) {
        dispatch(fetchAdminOrders());
    }
  }, [dispatch, adminOrders.length]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-40 text-lg">Cargando pedidos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 text-center p-4">Error al cargar pedidos: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-12"> {/* Padding adaptable */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#32CD32]">LISTA DE TODOS LOS PEDIDOS</h2>
      
      {adminOrders.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Información</p>
          <p>No hay pedidos registrados en el sistema. (Asegúrate de que el backend esté ejecutándose).</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-[#32CD32] text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Comprador</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Fecha</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Total</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adminOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{order.userEmail}</td> 
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.creationDate).toLocaleDateString('es-AR')}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {order.status || 'Completado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
