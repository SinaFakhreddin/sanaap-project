import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CreaditModalState = {
  isOpen: boolean;
};

const initialState: CreaditModalState = {
  isOpen: false,
};

const creaditRepresentivesModalSlice = createSlice({
  name: "creaditModal",
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setModalOpen } = creaditRepresentivesModalSlice.actions;

export default creaditRepresentivesModalSlice.reducer;
