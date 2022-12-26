import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyPaciente, creatingNewPaciente } from "./pacientesSlice";

export const startNewPaciente = (info) => {
  return async (dispatch, getState) => {
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
      fecha: info.formattedDate === "" ? info.values.fecha : info.formattedDate,
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
    dispatch(addNewEmptyPaciente(newPaciente));

    // dispatch
    // dispatch (newPaciente)
    // dispatch (activarPaciente)
  };
};
