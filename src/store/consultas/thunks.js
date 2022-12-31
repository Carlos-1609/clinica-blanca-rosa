import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyConsulta, setSaving } from "./consultasSlice";

export const startNewConsulta = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSaving(true));
      console.log("Start new Consulta");
      const { consultaInfo } = getState().consultas;
      const { uid } = getState().auth;
      const { activePaciente } = getState().pacientes;

      const infoPaciente = {
        id_paciente: activePaciente.id,
        nombre_paciente: activePaciente.nombre,
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
