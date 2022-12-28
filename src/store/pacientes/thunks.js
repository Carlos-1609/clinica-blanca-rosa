import {
  collection,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addCounter,
  addNewEmptyPaciente,
  creatingNewPaciente,
  setActivePaciente,
  setCounter,
  setFirstPaciente,
  setLastPaciente,
  setPacientes,
  subCounter,
  updatePaciente,
} from "./pacientesSlice";

export const startNewPaciente = (info) => {
  return async (dispatch, getState) => {
    try {
      console.log("startNewPaciente");
      dispatch(creatingNewPaciente());
      const newPaciente = {
        identidad: info.values.identidad,
        nombre: info.values.nombre,
        edad: parseInt(info.values.edad),
        sexo: info.values.sexo,
        escolaridad: info.values.escolaridad,
        domicilio: info.values.domicilio,
        telefono: info.values.telefono,
        referido: info.values.referido,
        fecha:
          info.formattedDate === "" ? info.values.fecha : info.formattedDate,
        ocupacion: info.values.ocupacion,
        email: info.values.email,
        imageUrls: info.values.imageUrls,
      };

      console.log(newPaciente);
      const { uid } = getState().auth;
      const newDoc = doc(
        collection(FirebaseDB, `${uid}/pacientes/informacion-paciente`)
      );
      const setDocResp = await setDoc(newDoc, newPaciente);
      newPaciente.id = newDoc.id;
      dispatch(addNewEmptyPaciente(newPaciente));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLoadingPacientes = (type = "") => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      console.log("se empezaron a cargar los pacientes");
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
      let q = query(collectionRef, orderBy("nombre"), limit(5));

      const pacientes = [];
      const docs = await getDocs(q);
      dispatch(setLastPaciente(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstPaciente(docs._docs[0]));
      docs.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
      });
      console.log(pacientes);
      dispatch(setCounter());
      dispatch(setPacientes(pacientes));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUpdatePaciente = (updatedPaciente) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;

      const pacienteToFireStore = { ...updatedPaciente };
      delete pacienteToFireStore.id;

      const docRef = doc(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente/${updatedPaciente.id}`
      );
      await setDoc(docRef, pacienteToFireStore, { merge: true });
      dispatch(setActivePaciente(null));
      dispatch(updatePaciente(updatedPaciente));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onNextPacientes = (fn) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const { lastPaciente, firstPaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
      let q = query(
        collectionRef,
        orderBy("nombre"),
        limit(5),
        startAfter(lastPaciente)
      );

      const pacientes = [];
      const docs = await getDocs(q);
      if (docs._docs.length === 0) {
        return dispatch(startLoadingPacientes());
      }
      // console.log(docs._docs[docs._docs.length - 1]);
      dispatch(setLastPaciente(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstPaciente(docs._docs[0]));
      docs.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(addCounter());
      dispatch(setPacientes(pacientes));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onBackPacientes = (fn) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const { firstPaciente, lastPaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
      let q = query(
        collectionRef,
        orderBy("nombre"),
        limitToLast(5),
        endBefore(firstPaciente)
      );

      const pacientes = [];
      const docs = await getDocs(q);
      console.log(docs);
      if (docs._docs.length === 0) {
        console.log("entre al if");
        return dispatch(startLoadingPacientes());
      }
      // console.log(docs._docs[docs._docs.length - 1]);
      dispatch(setLastPaciente(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstPaciente(docs._docs[0]));
      docs.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
      });
      console.log(pacientes);
      dispatch(subCounter());
      dispatch(setPacientes(pacientes));
    } catch (error) {
      console.log(error);
    }
  };
};
