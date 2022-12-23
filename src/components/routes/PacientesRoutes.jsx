import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Consulta from "../consulta/Consulta";
import FichaMedica from "../ficha-medica/FichaMedica";
import InformacionPaciente from "../informacion-paciente/InformacionPaciente";
import ListaConsultas from "../lista-consultas/ListaConsultas";
import Pacientes from "../pacientes/Pacientes";

export const PacientesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="pacientes" element={<Pacientes />}></Route>
        <Route
          path="informacion_paciente"
          element={<InformacionPaciente />}
        ></Route>
        <Route path="consulta" element={<Consulta />}></Route>
        <Route path="ficha_medica" element={<FichaMedica />}></Route>
        <Route path="lista_consultas" element={<ListaConsultas />}></Route>

        <Route path="/" element={<Navigate to="/pacientes" />}></Route>
      </Routes>
    </>
  );
};
