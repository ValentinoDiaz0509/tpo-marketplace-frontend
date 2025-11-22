import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunk existente para el usuario
export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (_, { rejectWithValue }) => {
    try {
      // Usamos el endpoint de usuario: /order/me (asumo que se resuelve correctamente)
      const { data } = await axios.get(`/order/me`); 
      console.log(data);
      return data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// NUEVO THUNK PARA EL ADMINISTRADOR
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Usamos el endpoint del administrador: /api/v1/admin/orders
      const { data } = await axios.get(`/api/v1/admin/orders`); 
      return data;
    } catch (err) {
      // Usamos response.data.message si está disponible para errores más específicos
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(`Error al cargar pedidos: ${errorMessage}`);
      return rejectWithValue(errorMessage);
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    currentUserOrders: [],
    // NUEVO ESTADO PARA LAS ÓRDENES DEL ADMIN
    adminOrders: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Casos existentes para el usuario
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserOrders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // NUEVOS CASOS PARA EL ADMINISTRADOR
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload; // <-- Guardamos la lista completa
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
