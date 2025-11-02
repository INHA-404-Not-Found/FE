import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.locations = action.payload;
    },
    clearLocation(state) {
      state.list = [];
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
