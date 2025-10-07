// ----------------------
// carrito local
// ----------------------

const API_URL = "http://localhost:4002";

// recuperar carrito existente o crear uno vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// guardar carrito actualizado en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// agregar un juego al carrito
function addToCart(gameId, title, price) {
  const existing = cart.find(item => item.gameId === gameId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ gameId, title, price, quantity: 1 });
  }
  saveCart();
  alert(`"${title}" agregado al carrito 🛒`);
}

// eliminar un juego del carrito
function removeFromCart(gameId) {
  cart = cart.filter(item => item.gameId !== gameId);
  saveCart();
  renderCart();
}

// vaciar el carrito
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartContainer");
  if (!container) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${item.title}</b> — $${item.price} x ${item.quantity}
      <button onclick="removeFromCart(${item.gameId})">🗑️</button>
      <hr>
    `;
    container.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  container.appendChild(totalDiv);
}

// pasarlo al checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cartContainer")) renderCart();
});
