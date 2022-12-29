import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const pacientesSlice = createSlice({
  name: "pacientes",
  initialState: {
    isSaving: false,
    messageInsert: "",
    messageSaved: "",
    pacientes: [],
    activePaciente: null,
    firstPaciente: null,
    lastPaciente: null,
    counter: 0,
  },
  reducers: {
    creatingNewPaciente: (state) => {
      state.isSaving = true;
    },
    addNewEmptyPaciente: (state, action) => {
      state.messageInsert = "";
      state.pacientes.push(action.payload);
      Swal.fire(
        "Paciente Registrado",
        `${action.payload.nombre}, fue registrado de manera de exitosa`,
        "success"
      );
      // state.messageInsert = `${action.payload.nombre}, fue registrado de manera de exitosa`;
    },
    setActivePaciente: (state, action) => {
      state.activePaciente = action.payload;
      state.messageSaved = "";
    },
    setPacientes: (state, action) => {
      state.pacientes = action.payload;
      state.isSaving = false;
    },

    updatePaciente: (state, action) => {
      state.messageSaved = "";
      state.pacientes = state.pacientes.map((paciente) => {
        if (paciente.id === action.payload.id) {
          return action.payload;
        }
        return paciente;
      });
      Swal.fire(
        "Paciente Actualizado",
        `${action.payload.nombre}, fue actualizado de manera de exitosa`,
        "success"
      );
    },
    setPhotosPaciente: (state, action) => {
      state.activePaciente.imageUrls = [
        ...state.activePaciente.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    setLastPaciente: (state, action) => {
      state.lastPaciente = action.payload;
    },
    setFirstPaciente: (state, action) => {
      state.firstPaciente = action.payload;
    },
    addCounter: (state, action) => {
      state.counter = state.counter + 1;
    },
    subCounter: (state, action) => {
      state.counter = state.counter - 1;
    },
    setCounter: (state, action) => {
      state.counter = 0;
    },
    setSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    clearLogoutPacientes: (state) => {
      state.isSaving = false;
      state.messageInsert = "";
      state.messageSaved = "";
      state.pacientes = [];
      state.activePaciente = null;
      state.firstPaciente = null;
      state.lastPaciente = null;
      state.counter = 0;
    },
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
  setLastPaciente,
  setFirstPaciente,
  addCounter,
  subCounter,
  setCounter,
  setSaving,
  setPhotosPaciente,
  clearLogoutPacientes,
} = pacientesSlice.actions;
