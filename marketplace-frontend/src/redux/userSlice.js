import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/usuarios`);
      return data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "users/changeUserRole",
  async ({ userId, userRole }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/v1/admin/usuarios/${userId}/rol`, userRole);
      toast.success("Rol actualizado exitosamente!");

      return { userId, userRole };
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const { userId, userRole } = action.payload;

        const userIndex = state.userList.findIndex(
          (user) => user.id === userId
        );

        if (userIndex !== -1) {
          state.userList[userIndex] = {
            ...state.userList[userIndex],
            role: userRole.nuevoRol,
          };
        }
        state.loading = false;
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
