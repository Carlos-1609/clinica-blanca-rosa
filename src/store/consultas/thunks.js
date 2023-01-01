import {
  collection,
  doc,
  limit,
  query,
  setDoc,
  where,
  orderBy,
  getDocs,
  startAfter,
  limitToLast,
  endBefore,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addCounter,
  addNewEmptyConsulta,
  setConsultas,
  setCounter,
  setFirstConsulta,
  setLastConsulta,
  setSaving,
  subCounter,
} from "./consultasSlice";

export const startNewConsulta = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      console.log("Start new Consulta");
      const { consultaInfo } = getState().consultas;
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;

      const infoPaciente = {
        idPaciente: activePaciente.id,
        nombrePaciente: activePaciente.nombre,
      };

      const consulta = { ...consultaInfo, ...infoPaciente };
      console.log({ ...consultaInfo, ...infoPaciente });
      const newDoc = doc(collection(FirebaseDB, `${uid}/pacientes/consultas`));
      const setDocResp = await setDoc(newDoc, consulta);
      consulta.id = newDoc.id;
      console.log(setDocResp);
      dispatch(setSaving(false));
      dispatch(addNewEmptyConsulta(consulta));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(true));
    }
  };
};

export const startLoadingConsultas = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      console.log("se empezaron a cargar las consultas");
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      let q = query(
        collectionRef,
        where("nombrePaciente", ">=", nombre),
        where("nombrePaciente", "<=", nombre + "\uf8ff"),
        orderBy("nombrePaciente"),
        limit(5)
      );

      const consultas = [];
      const docs = await getDocs(q);
      dispatch(setLastConsulta(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstConsulta(docs._docs[0]));
      docs.forEach((doc) => {
        consultas.push({ id: doc.id, ...doc.data() });
      });
      console.log(consultas);
      dispatch(setCounter());
      dispatch(setConsultas(consultas));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};

export const onNextConsulta = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { lastConsulta, firstConsulta } = getState().consultas;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      // console.log(nombre);
      let q = query(
        collectionRef,
        where("nombrePaciente", ">=", nombre),
        where("nombrePaciente", "<=", nombre + "\uf8ff"),
        orderBy("nombrePaciente"),
        startAfter(lastConsulta),
        limit(5)
      );

      const consultas = [];
      const docs = await getDocs(q);
      // console.log("Data del boton de next");
      // console.log(docs);
      if (docs._docs.length === 0) {
        console.log("Entre al if del boton de next");
        return dispatch(startLoadingConsultas());
      }
      dispatch(setLastConsulta(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstConsulta(docs._docs[0]));
      docs.forEach((doc) => {
        consultas.push({ id: doc.id, ...doc.data() });
      });
      dispatch(addCounter());
      dispatch(setConsultas(consultas));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};

export const onBackConsulta = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { lastConsulta, firstConsulta } = getState().consultas;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      let q = query(
        collectionRef,
        where("nombrePaciente", ">=", nombre),
        where("nombrePaciente", "<=", nombre + "\uf8ff"),
        orderBy("nombrePaciente"),
        limitToLast(5),
        endBefore(firstConsulta)
      );

      const consultas = [];
      const docs = await getDocs(q);
      console.log("Data del boton de back");
      console.log(docs);
      if (docs._docs.length === 0) {
        console.log("Entre al if del boton de back");
        return dispatch(startLoadingConsultas());
      }
      // console.log(docs._docs[docs._docs.length - 1]);
      dispatch(setLastConsulta(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstConsulta(docs._docs[0]));
      docs.forEach((doc) => {
        consultas.push({ id: doc.id, ...doc.data() });
      });
      // console.log(consultas);
      dispatch(subCounter());
      dispatch(setConsultas(consultas));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};
