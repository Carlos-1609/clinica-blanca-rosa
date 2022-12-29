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
  where,
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
  setSaving,
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

export const startLoadingPacientes = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      console.log("se empezaron a cargar los pacientes");
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
      let q = query(
        collectionRef,
        where("nombre", ">=", nombre),
        where("nombre", "<=", nombre + "\uf8ff"),
        orderBy("nombre"),
        limit(5)
      );

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

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    console.log(files);
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

export const onNextPacientes = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const { lastPaciente, firstPaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
      console.log(nombre);
      let q = query(
        collectionRef,
        where("nombre", ">=", nombre),
        where("nombre", "<=", nombre + "\uf8ff"),
        orderBy("nombre"),
        startAfter(lastPaciente),
        limit(5)
      );

      const pacientes = [];
      const docs = await getDocs(q);
      // console.log("Data del boton de next");
      // console.log(docs);
      if (docs._docs.length === 0) {
        console.log("Entre al if del boton de next");
        return dispatch(startLoadingPacientes());
      }
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

export const onBackPacientes = (nombre = "") => {
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
        where("nombre", ">=", nombre),
        where("nombre", "<=", nombre + "\uf8ff"),
        orderBy("nombre"),
        limitToLast(5),
        endBefore(firstPaciente)
      );

      const pacientes = [];
      const docs = await getDocs(q);
      console.log("Data del boton de back");
      console.log(docs);
      if (docs._docs.length === 0) {
        console.log("Entre al if del boton de back");
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
