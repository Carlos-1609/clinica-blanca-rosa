import { Timestamp } from "firebase/firestore";
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
  deleteDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addCounter,
  addNewEmptyConsulta,
  deleteConsultaById,
  setActiveConsulta,
  setConsultas,
  setCounter,
  setFirstConsulta,
  setLastConsulta,
  setSaving,
  setTypeAction,
  subCounter,
  updateConsulta,
} from "./consultasSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const startNewConsulta = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));

      const { consultaInfo } = getState().consultas;
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;

      //set las fechas y timestamp de la consulta

      const infoPaciente = {
        idPaciente: activePaciente.id,
        nombrePaciente: activePaciente.nombre,
        createdAt: Timestamp.fromDate(new Date()).seconds,
        fecha: new Date().toLocaleDateString("es-es"),
      };

      const consulta = { ...consultaInfo, ...infoPaciente };
      // console.log({ ...consultaInfo, ...infoPaciente });
      const newDoc = doc(collection(FirebaseDB, `${uid}/pacientes/consultas`));
      const setDocResp = await setDoc(newDoc, consulta);
      consulta.id = newDoc.id;
      // console.log(setDocResp);
      dispatch(setSaving(false));
      dispatch(setTypeAction(null));
      dispatch(addNewEmptyConsulta(consulta));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(true));
      Swal.fire(
        "Ocurrio un error al ingresar la consulta del paciente",
        `${error}`,
        "error"
      );
    }
  };
};

export const startUpdateConsulta = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { activeConsulta, consultaInfo } = getState().consultas;
      const consulta = {
        ...consultaInfo,
      };

      const consultaToFireStore = { ...consulta };
      delete consultaToFireStore.id;

      const docRef = doc(
        FirebaseDB,
        `${uid}/pacientes/consultas/${consulta.id}`
      );

      await setDoc(docRef, consultaToFireStore, { merge: true });

      dispatch(updateConsulta(consulta));
      dispatch(setActiveConsulta(null));
      dispatch(setTypeAction(null));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
      Swal.fire(
        "Ocurrio un error al actualizar la consulta del paciente",
        `${error}`,
        "error"
      );
    }
  };
};

export const deleteConsulta = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { activeConsulta } = getState().consultas;
      // console.log({uid, activeConsulta});
      const docRef = doc(
        FirebaseDB,
        `${uid}/pacientes/consultas/${activeConsulta.id}`
      );
      await deleteDoc(docRef);

      dispatch(deleteConsultaById(activeConsulta.id));
      dispatch(startLoadingConsultas());
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
      Swal.fire(
        "Ocurrio un error al eliminar la consulta del paciente",
        `${error}`,
        "error"
      );
    }
  };
};

export const startLoadingConsultas = (fecha = "") => {
  return async (dispatch, getState) => {
    try {
      //ZRa2y2ClfsiZTldNBgKB
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      let q = query(
        collectionRef,
        where("idPaciente", "==", activePaciente.id),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const consultas = [];
      const docs = await getDocs(q);
      dispatch(setLastConsulta(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstConsulta(docs._docs[0]));
      docs.forEach((doc) => {
        consultas.push({ id: doc.id, ...doc.data() });
      });
      // console.log(consultas);
      dispatch(setCounter());
      dispatch(setConsultas(consultas));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
      Swal.fire(
        "Ocurrio un error al cargar las consultas del paciente",
        `${error}`,
        "error"
      );
    }
  };
};

export const onNextConsulta = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { lastConsulta, firstConsulta } = getState().consultas;
      const { activePaciente } = getState().pacientes;

      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      let q = query(
        collectionRef,
        where("idPaciente", "==", activePaciente.id),
        orderBy("createdAt", "desc"),
        startAfter(lastConsulta),
        limit(5)
      );

      const consultas = [];
      const docs = await getDocs(q);

      if (docs._docs.length === 0) {
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
      const { activePaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );
      let q = query(
        collectionRef,
        where("idPaciente", "==", activePaciente.id),
        orderBy("createdAt", "desc"),
        limitToLast(5),
        endBefore(firstConsulta)
      );

      const consultas = [];
      const docs = await getDocs(q);
      // console.log("Data del boton de back");
      // console.log(docs);
      if (docs._docs.length === 0) {
        // console.log("Entre al if del boton de back");
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
