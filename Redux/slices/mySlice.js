import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const mySlice = createSlice({
  name: "my",
  initialState,
  reducers: {
    setMy: (state, action) => {
      state.info = action.payload;
    },
    clearMy: (state) => {
      state.info = null;
    },
  },
});

export const { setMy, clearMy } = mySlice.actions;
export default mySlice.reducer;
