import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingConsultas } from "../store/consultas/thunks";

export const useLoadConsultas = () => {
  const dispatch = useDispatch();
  // const { pacientes } = useSelector((state) => state.pacientes);

  useEffect(() => {
    dispatch(startLoadingConsultas());
  }, []);
};
