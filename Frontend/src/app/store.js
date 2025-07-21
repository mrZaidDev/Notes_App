import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/myauth/authSlice'

export const store = configureStore({
  reducer: {
    // Add your slices here
    auth:authSlice
  },
});
