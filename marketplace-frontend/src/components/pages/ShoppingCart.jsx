import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, removeItem, updateQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  // 1. NUEVO ESTADO: Controla si estamos en la vista de lista o en el formulario de pago
  const [isCheckout, setIsCheckout] = useState(false);

  // 2. ESTADOS LOCALES PARA EL PAGO
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handlecreateOrder = (e) => {
    e.preventDefault();

    if (cardNumber.length < 16 || !cardName || !expiryDate || !cvv) {
      toast.error("Por favor, completa todos los campos de la tarjeta.");
      return;
    }

    // 4. CONSTRUCCIÓN DEL PAYLOAD Y DESPACHO
    const itemList = items.map((item) => ({
      gameId: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      itemList: itemList,
    };

    dispatch(createOrder(orderData));
  };

  // Manejo de carrito vacío
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-xl text-white">
        <h2 className="text-3xl font-bold mb-6">🛍️ Tu Carrito de Compras</h2>
        <p className="text-gray-400">Tu carrito está vacío.</p>
      </div>
    );
  }

  // 5. RENDERIZADO CONDICIONAL
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-6">
        {isCheckout ? "Finalizar Compra" : "🛍️ Tu Carrito de Compras"}
      </h2>

      {/* --- VISTA 1: LISTA DEL CARRITO --- */}
      {!isCheckout && (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, e.target.value)
                    }
                    className="w-16 p-1 text-center bg-gray-700 border border-gray-600 rounded text-white"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-600 mt-4">
            <h3 className="text-xl font-bold text-right">
              Total: ${totalAmount.toFixed(2)}
            </h3>

            {/* 6. BOTÓN PARA CAMBIAR A LA VISTA DE PAGO */}
            <button
              onClick={() => setIsCheckout(true)}
              className="w-full mt-4 py-3 rounded-lg font-bold transition bg-green-500 hover:bg-green-600"
              disabled={loading}
            >
              Ir a Pagar (${totalAmount.toFixed(2)})
            </button>
          </div>
        </>
      )}

      {/* --- VISTA 2: FORMULARIO DE PAGO --- */}
      {isCheckout && (
        <form onSubmit={handlecreateOrder} className="pt-6 space-y-4">
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Datos de Pago
          </h3>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsCheckout(false)}
              className="text-blue-400 hover:text-blue-300 mb-4"
            >
              &larr; Volver al Carrito
            </button>
            <h3 className="text-xl font-bold">
              Total: ${totalAmount.toFixed(2)}
            </h3>
          </div>

          {/* 💳 Número de Tarjeta */}
          <div>
            <label className="block font-medium mb-1">Número de Tarjeta:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              maxLength="19"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  e.target.value
                    .replace(/\s?/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()
                )
              }
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>

          {/* 👤 Nombre en la Tarjeta */}
          <div>
            <label className="block font-medium mb-1">
              Nombre en la Tarjeta:
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="NOMBRE APELLIDO"
              required
            />
          </div>

          <div className="flex space-x-4">
            {/* 📅 Fecha de Expiración */}
            <div className="w-1/2">
              <label className="block font-medium mb-1">
                Fecha Exp. (MM/AA):
              </label>
              <input
                type="text"
                maxLength="5"
                value={expiryDate}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(/\D/g, "");

                  let formattedValue = cleanedValue;

                  // Añadir "/" después de los primeros dos dígitos (MM)
                  if (cleanedValue.length > 2) {
                    formattedValue = cleanedValue.replace(
                      /^(\d{2})(.*)$/,
                      "$1/$2"
                    );
                  }

                  // Limitar la longitud a MM/AA (5 caracteres)
                  formattedValue = formattedValue.substring(0, 5);

                  setExpiryDate(formattedValue);
                }}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="MM/AA"
                required
              />
            </div>

            {/* 🔒 CVV */}
            <div className="w-1/2">
              <label className="block font-medium mb-1">CVV:</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength="4"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="XXX"
                required
              />
            </div>
          </div>

          {/* 🚀 Botón Finalizar Compra */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Procesando pago..." : "Pagar y Finalizar Compra"}
          </button>
        </form>
      )}
    </div>
  );
}
