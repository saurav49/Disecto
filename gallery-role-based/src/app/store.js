import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../features/collection/collectionSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    auth: authReducer,
  },
});
