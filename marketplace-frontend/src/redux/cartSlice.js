import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (orderData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/order", orderData);
      toast.success("🎉 ¡Compra realizada con éxito!");

      dispatch(clearCart());

      return response.data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Función auxiliar para guardar el estado en localStorage
const saveStateToLocalStorage = (items) => {
  try {
    const serializedState = JSON.stringify(items);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save cart to local storage", e);
  }
};

const getInitialState = () => {
  const cart = localStorage.getItem("cart");

  return {
    items: cart ? JSON.parse(cart) : [],
    loading: false,
    error: null,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    /** Agrega un juego al carrito o incrementa su cantidad si ya existe. */
    addItem: (state, action) => {
      const newItem = action.payload; // Espera un objeto con { id, title, price, quantity: 1 }
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveStateToLocalStorage(state.items);
    },
    /** Elimina completamente un item del carrito por su ID. */
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
      saveStateToLocalStorage(state.items);
    },
    /** Actualiza la cantidad de un item, si quantity es 0, lo elimina. */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      saveStateToLocalStorage(state.items);
    },
    /** Vacía completamente el carrito. */
    clearCart: (state) => {
      state.items = [];
      saveStateToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      // placeOrder.pending
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // placeOrder.fulfilled
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      // placeOrder.rejected
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
