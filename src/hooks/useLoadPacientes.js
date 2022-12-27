import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingPacientes } from "../store/pacientes/thunks";

export const useLoadPacientes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingPacientes());
  }, []);
};
