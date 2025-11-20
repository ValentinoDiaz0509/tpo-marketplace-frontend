import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getRole, getUserId } from "../utils/decodeJwt";
import { updateUserProfile } from "./profileSlice";
import { setupAxiosInterceptors } from "../utils/axiosConfig";

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectWithValue }) => {
    try {
      await axios.post(`/api/v1/auth/register`, newUser);
      toast.success("¡Registro exitoso! Ahora podés iniciar sesión.");
      return true;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/auth/authenticate`,
        userCredentials
      );

      const role = getRole(data.access_token);
      const userId = getUserId(data.access_token);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      toast.success(`Login exitoso, bienvenido a GameSphere!`);

      return { token: data.access_token, role, userId };
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = parseInt(localStorage.getItem("userId"));

  return {
    token: token || null,
    role: role || "",
    userId: userId || null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      state.userId = null;
      state.loading = false;
      state.error = null;

      localStorage.clear();
      setupAxiosInterceptors(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.userId = action.payload.userId;
        setupAxiosInterceptors(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.role = null;
        state.userId = null;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        setupAxiosInterceptors(action.payload.token);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
