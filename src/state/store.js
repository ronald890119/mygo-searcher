import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slice";

// This file configures the Redux store for the application
export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
});

export default store;
