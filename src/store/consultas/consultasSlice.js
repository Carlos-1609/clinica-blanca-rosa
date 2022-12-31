import { createSlice } from "@reduxjs/toolkit";

export const consultasSlice = createSlice({
  name: "consultas",
  initialState: {
    isSavingConsulta: false,
    messageInsert: "",
    messageSaved: "",
    consultas: [],
    activeConsulta: null,
    firstConsulta: null,
    lastConsulta: null,
    counter: 0,
    consultaInfo: {
      id_paciente: "",
      nombre_paciente: "",
      fecha: new Date().toLocaleDateString("es-es"),
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
    },
  },
  reducers: {
    creatingNewPaciente: (state) => {
      state.isSaving = true;
    },
    addNewEmptyConsulta: (state, action) => {
      state.consultas.push(action.payload);
    },
    setActiveConsulta: (state, action) => {},
    setConsultas: (state, action) => {},
    updateConsulta: (state, action) => {},

    setLastConsulta: (state, action) => {},
    setFirstConsulta: (state, action) => {},
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
      state.isSavingConsulta = action.payload;
    },
    setConsultaInfo: (state, action) => {
      state.consultaInfo = action.payload;
    },
    clearConsultaInfo: (state, action) => {
      state.consultaInfo = {
        id_paciente: "",
        nombre_paciente: "",
        fecha: new Date().toLocaleDateString("es-es"),
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
      };
    },
    clearLogoutPacientes: (state) => {
      state.isSavingConsulta = false;
      state.messageInsert = "";
      state.messageSaved = "";
      state.consultas = [];
      state.activeConsulta = null;
      state.firstConsulta = null;
      state.lastConsulta = null;
      state.counter = 0;
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
  clearLogoutPacientes,
  setConsultaInfo,
  clearConsultaInfo,
} = consultasSlice.actions;
