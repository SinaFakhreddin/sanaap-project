import { configureStore } from "@reduxjs/toolkit";
import creaditRepresentivesModalSlice from "./storeSlices/CreaditRepresentivesModalSlice.ts";

export const store = configureStore({
  reducer: {
    creaditRepresentivesModal: creaditRepresentivesModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
