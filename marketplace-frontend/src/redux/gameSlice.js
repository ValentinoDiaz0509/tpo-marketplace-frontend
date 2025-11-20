import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchGamesAdmin = createAsyncThunk(
  "games/fetchGamesAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/games/admin`);
      return data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGamesUser = createAsyncThunk(
  "games/fetchGamesUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/games/get/available`);
      return data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGameById = createAsyncThunk(
  "games/fetchGameById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/games/get/${id}`);
      return data;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const createGame = createAsyncThunk(
  "games/createGame",
  async ({ gameData, imageFile }, { rejectWithValue }) => {
    try {
      if (imageFile) {
        const formData = new FormData();
        // 1. Añadir el archivo de imagen con el nombre 'imagen'
        formData.append("imagen", imageFile);

        // 2. Añadir todos los campos del juego individualmente
        formData.append("title", gameData.title);
        formData.append("price", gameData.price);
        formData.append("stock", gameData.stock);
        formData.append("platform", gameData.platform);
        // Asegurar que el descuento tenga un valor por defecto si no está presente
        formData.append("discount", gameData.discount || 0.0);

        // 3. Manejar el array categoriesIds
        // Spring espera múltiples RequestParams con el mismo nombre para un List<Long>.
        // FormData lo maneja correctamente añadiendo múltiples veces la clave.
        gameData.categoriesIds.forEach((id) => {
          formData.append("categoriesIds", id);
        });

        await axios.post(`/games/admin/create-with-image`, formData);
      } else {
        await axios.post(`/games/admin/create`, gameData);
      }

      toast.success("✅ Videojuego creado correctamente");
      return true;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateGame = createAsyncThunk(
  "games/updateGame",
  async ({ id, gameData, imageFile }, { rejectWithValue }) => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append(
          "game",
          new Blob([JSON.stringify(gameData)], { type: "application/json" })
        );
        formData.append("image", imageFile);

        await axios.put(`/games/admin/${id}/edit-with-image`, formData);
      } else {
        await axios.put(`/games/admin/${id}`, gameData);
      }

      toast.success("✅ Videojuego actualizado correctamente");
      return true;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (gameId, { rejectWithValue }) => {
    try {
      await axios.delete(`/games/admin/${gameId}`);
      toast.success("✅ Juego eliminado exitosamente");
      return gameId;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const gameSlice = createSlice({
  name: "games",
  initialState: {
    adminGameList: [],
    userGameList: [],
    currentGame: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminGameList = action.payload;
      })
      .addCase(fetchGamesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGamesUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userGameList = action.payload;
      })
      .addCase(fetchGamesUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGameById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        const removedGameId = action.payload;
        state.userGameList = state.userGameList.filter(
          (game) => game.id !== removedGameId
        );
        state.adminGameList = state.adminGameList.filter(
          (game) => game.id !== removedGameId
        );
        state.loading = false;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gameSlice.reducer;
