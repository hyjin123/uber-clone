import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

// this configures the data layer
export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
