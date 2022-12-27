import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingPacientes } from "../store/pacientes/thunks";

export const useLoadPacientes = () => {
  const dispatch = useDispatch();
  // const { pacientes } = useSelector((state) => state.pacientes);

  useEffect(() => {
    dispatch(startLoadingPacientes());
  }, []);
};
