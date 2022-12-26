import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { pacientesSlice } from "./pacientes/pacientesSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pacientes: pacientesSlice.reducer,
  },
});
