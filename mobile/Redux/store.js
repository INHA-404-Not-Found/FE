import { configureStore } from "@reduxjs/toolkit";
import category from "./slices/categorySlice";
import search from "./slices/keywordSlice";
import location from "./slices/locationSlice";
import myReducer from "./slices/mySlice";

export const store = configureStore({
  reducer: {
    my: myReducer,
    category: category,
    location: location,
    search: search,
  },
});
