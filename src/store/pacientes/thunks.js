import {
  collection,
  deleteDoc,
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
import { fileUpload } from "../../helpers/fileUpload";
import {
  addCounter,
  addNewEmptyPaciente,
  creatingNewPaciente,
  deletePacienteById,
  setActivePaciente,
  setCounter,
  setFirstPaciente,
  setLastPaciente,
  setPacientes,
  setPhotosPaciente,
  setSaving,
  subCounter,
  updatePaciente,
} from "./pacientesSlice";
import axios from "axios";

export const startNewPaciente = (info) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
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
        seguro: info.values.seguro,
        motivo: info.values.motivo,
        createdAt: info.values.createdAt,
      };

      const { uid } = getState().auth;
      const newDoc = doc(
        collection(FirebaseDB, `${uid}/pacientes/informacion-paciente`)
      );
      const setDocResp = await setDoc(newDoc, newPaciente);
      newPaciente.id = newDoc.id;
      dispatch(setSaving(false));
      dispatch(addNewEmptyPaciente(newPaciente));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(true));
    }
  };
};

export const startLoadingPacientes = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
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
      // let q = query(
      //   collectionRef,
      //   orderBy("fecha", "desc"),
      //   limit(5)
      // );
      const pacientes = [];
      const docs = await getDocs(q);
      dispatch(setLastPaciente(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstPaciente(docs._docs[0]));
      docs.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setCounter());
      dispatch(setPacientes(pacientes));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));
    // await fileUpload(files[0]);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    console.log(photosUrls);
    dispatch(setPhotosPaciente(photosUrls));
  };
};

export const startUpdatePaciente = (updatedPaciente) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;
      const paciente = {
        ...updatedPaciente,
        ["imageUrls"]: [...activePaciente.imageUrls],
      };

      const pacienteToFireStore = { ...paciente };
      delete pacienteToFireStore.id;

      const docRef = doc(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente/${paciente.id}`
      );
      await setDoc(docRef, pacienteToFireStore, { merge: true });

      dispatch(updatePaciente(paciente));
      dispatch(setActivePaciente(null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePaciente = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;

      const docRef = doc(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente/${activePaciente.id}`
      );

      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/consultas`
      );

      let q = query(
        collectionRef,
        where("idPaciente", "==", activePaciente.id)
      );
      const docs = await getDocs(q);
      docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      await deleteDoc(docRef);
      dispatch(deletePacienteById(activePaciente.id));
      dispatch(startLoadingPacientes());
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};

export const onNextPacientes = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      const { uid } = getState().auth;
      const { lastPaciente, firstPaciente } = getState().pacientes;
      const collectionRef = collection(
        FirebaseDB,
        `${uid}/pacientes/informacion-paciente`
      );
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
        return dispatch(startLoadingPacientes());
      }
      dispatch(setLastPaciente(docs._docs[docs._docs.length - 1]));
      dispatch(setFirstPaciente(docs._docs[0]));
      docs.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(addCounter());
      dispatch(setPacientes(pacientes));
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};

export const onBackPacientes = (nombre = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
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
      dispatch(setSaving(false));
    } catch (error) {
      console.log(error);
      dispatch(setSaving(false));
    }
  };
};
