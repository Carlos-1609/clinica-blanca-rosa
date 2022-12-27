import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",
  initialState: {
    isSaving: false,
    messageSaved: "",
    pacientes: [],
    activePaciente: null,
  },
  reducers: {
    creatingNewPaciente: (state) => {
      state.isSaving = true;
    },
    addNewEmptyPaciente: (state, action) => {
      state.isSaving = false;
      state.pacientes.push(action.payload);
    },
    setActivePaciente: (state, action) => {
      state.activePaciente = action.payload;
    },
    setPacientes: (state, action) => {
      state.pacientes = action.payload;
    },
    setSavingPaciente: (state, action) => {},
    updatePaciente: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyPaciente,
  setActivePaciente,
  setPacientes,
  setSavingPaciente,
  updatePaciente,
  creatingNewPaciente,
} = pacientesSlice.actions;
