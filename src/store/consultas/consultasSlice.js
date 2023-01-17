import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const consultasSlice = createSlice({
  name: "consultas",
  initialState: {
    isSavingConsulta: false,
    onBackPage: false,
    messageInsert: "",
    messageSaved: "",
    consultas: [],
    activeConsulta: null,
    firstConsulta: null,
    lastConsulta: null,
    counter: 0,
    typeAction: null,
    consultaInfo: {
      idPaciente: "",
      nombrePaciente: "",
      fecha: "",
      motivo: "",
      dm: "",
      hta: "",
      glaucoma: "",
      trauma_ocular: "",
      cirugias: "",
      otros: "",
      av_sc_od: "",
      av_sc_os: "",
      av_ph_od: "",
      av_ph_os: "",
      av_cc_od: "",
      av_cc_os: "",
      lerca_od: "",
      lerca_os: "",
      lenso_od: "",
      lenso_os: "",
      lenso_tipo_lente: "",
      retracto_od: "",
      retracto_os: "",
      subjetiva_od: "",
      subjetiva_os: "",
      subjetiva_ad: "",
      kera_od: "",
      kera_os: "",
      observaciones: "",
      avl_od: "",
      avl_os: "",
      pio_od: "",
      pio_os: "",
      biomicroscopia: "",
      impresion_diagnostica: "",
      plan: "",
      createdAt: null,
    },
  },
  reducers: {
    creatingNewPaciente: (state) => {
      state.isSaving = true;
    },
    addNewEmptyConsulta: (state, action) => {
      state.consultas.push(action.payload);
      Swal.fire(
        "Consulta Registrada",
        `La consulta de ${action.payload.nombrePaciente}, fue registrada de manera de exitosa`,
        "success"
      );
    },
    setActiveConsulta: (state, action) => {
      state.activeConsulta = action.payload;
    },
    setConsultas: (state, action) => {
      state.consultas = action.payload;
      state.isSavingConsulta = false;
    },
    updateConsulta: (state, action) => {
      state.consultas = state.consultas.map((consulta) => {
        if (consulta.id === action.payload.id) {
          return action.payload;
        }
        return consulta;
      });
      Swal.fire(
        "Consulta Actualizada",
        `La consulta del paciente ${action.payload.nombrePaciente}, fue actualizada de manera de exitosa`,
        "success"
      );
    },

    deleteConsultaById: (state, action) => {
      state.activeConsulta = null;
      state.consultas = state.consultas.filter(
        (consulta) => consulta.id !== action.payload
      );
      Swal.fire(
        "Consulta Eliminada",
        `La consulta fue eliminada de manera de exitosa`,
        "success"
      );
    },

    setLastConsulta: (state, action) => {
      state.lastConsulta = action.payload;
    },
    setFirstConsulta: (state, action) => {
      state.firstConsulta = action.payload;
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
    setTypeAction: (state, action) => {
      state.typeAction = action.payload;
    },
    setSaving: (state, action) => {
      state.isSavingConsulta = action.payload;
    },
    setConsultaInfo: (state, action) => {
      state.consultaInfo = action.payload;
    },
    setOnBackPage: (state, action) => {
      state.onBackPage = action.payload;
    },
    clearConsultaInfo: (state, action) => {
      state.consultaInfo = {
        idPaciente: "",
        nombrePaciente: "",
        fecha: "",
        motivo: "",
        dm: "",
        hta: "",
        glaucoma: "",
        trauma_ocular: "",
        cirugias: "",
        otros: "",
        av_sc_od: "",
        av_sc_os: "",
        av_ph_od: "",
        av_ph_os: "",
        av_cc_od: "",
        av_cc_os: "",
        lerca_od: "",
        lerca_os: "",
        lenso_od: "",
        lenso_os: "",
        lenso_tipo_lente: "",
        retracto_od: "",
        retracto_os: "",
        subjetiva_od: "",
        subjetiva_os: "",
        subjetiva_ad: "",
        kera_od: "",
        kera_os: "",
        observaciones: "",
        avl_od: "",
        avl_os: "",
        pio_od: "",
        pio_os: "",
        biomicroscopia: "",
        impresion_diagnostica: "",
        plan: "",
        createdAt: null,
      };
    },
    clearLogoutConsultas: (state) => {
      state.isSavingConsulta = false;
      state.messageInsert = "";
      state.messageSaved = "";
      state.consultas = [];
      state.activeConsulta = null;
      state.firstConsulta = null;
      state.lastConsulta = null;
      state.counter = 0;
      state.onBackPage = false;
      state.typeAction = null;
      state.consultaInfo = {
        idPaciente: "",
        nombrePaciente: "",
        fecha: "",
        motivo: "",
        dm: "",
        hta: "",
        glaucoma: "",
        trauma_ocular: "",
        cirugias: "",
        otros: "",
        av_sc_od: "",
        av_sc_os: "",
        av_ph_od: "",
        av_ph_os: "",
        av_cc_od: "",
        av_cc_os: "",
        lerca_od: "",
        lerca_os: "",
        lenso_od: "",
        lenso_os: "",
        lenso_tipo_lente: "",
        retracto_od: "",
        retracto_os: "",
        subjetiva_od: "",
        subjetiva_os: "",
        subjetiva_ad: "",
        kera_od: "",
        kera_os: "",
        observaciones: "",
        avl_od: "",
        avl_os: "",
        pio_od: "",
        pio_os: "",
        biomicroscopia: "",
        impresion_diagnostica: "",
        plan: "",
        createdAt: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  creatingNewPaciente,
  addNewEmptyConsulta,
  setActiveConsulta,
  setConsultas,
  updateConsulta,
  setLastConsulta,
  setFirstConsulta,
  addCounter,
  subCounter,
  setCounter,
  setSaving,
  clearLogoutConsultas,
  setConsultaInfo,
  clearConsultaInfo,
  setTypeAction,
  setOnBackPage,
  deleteConsultaById,
} = consultasSlice.actions;
