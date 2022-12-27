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
  },
  reducers: {
    creatingNewPaciente: (state) => {
      state.isSaving = true;
    },
    addNewEmptyPaciente: (state, action) => {
      state.messageInsert = "";
      state.isSaving = false;
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
    },

    updatePaciente: (state, action) => {
      state.messageSaved = "";
      state.pacientes = state.pacientes.map((paciente) => {
        if (paciente.id === action.payload.id) {
          return action.payload;
        }
        return paciente;
      });
      //state.messageSaved = `${action.payload.nombre}, fue actualizado de manera de exitosa`;
      Swal.fire(
        "Paciente Actualizado",
        `${action.payload.nombre}, fue actualizado de manera de exitosa`,
        "success"
      );
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
} = pacientesSlice.actions;
