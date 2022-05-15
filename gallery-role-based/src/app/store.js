import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../features/collection/collectionSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});
