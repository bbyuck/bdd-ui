import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const clientInfoSlice = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {
    loadingStart(state = initialState) {
      state.loading = true;
    },
    loadingEnd(state = initialState) {
      state.loading = false;
    },
  },
});

export const { loadingStart, loadingEnd } = clientInfoSlice.actions;
export default clientInfoSlice.reducer;
