import { createSlice } from "@reduxjs/toolkit";

const keywordSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    isSearching: false,
  },
  reducers: {
    onIsSearching: (state) => {
      state.isSearching = true;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      if (!state.keyword) {
        state.isSearching = false;
      } else {
        state.isSearching = true;
      }
    },
    clearKeyword(state) {
      state.keyword = "";
      state.isSearching = false;
    },
  },
});

export const { onIsSearching, setKeyword, clearKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
