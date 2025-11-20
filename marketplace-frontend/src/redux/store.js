import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import gameReducer from "./gameSlice";
import categoryReducer from "./categorySlice";
import wishlistReducer from "./wishlistSlice";
import profileReducer from "./profileSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gameReducer,
    categories: categoryReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    users: userReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});
