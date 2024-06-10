import { configureStore } from "@reduxjs/toolkit";

// Slices
import userReducer from "../slices/user.slice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
