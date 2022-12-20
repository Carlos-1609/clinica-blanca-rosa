import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import RouteError from "./components/route-error/RouteError";
import Pacientes from "./components/pacientes/Pacientes";
import InformacionPaciente from "./components/informacion-paciente/InformacionPaciente";
import Consulta from "./components/consulta/Consulta";
import FichaMedica from "./components/ficha-medica/FichaMedica";
import ListaConsultas from "./components/lista-consultas/ListaConsultas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <RouteError />,
  },
  {
    path: "/pacientes",
    element: <Pacientes />,
    errorElement: <RouteError />,
  },
  {
    path: "/informacion_paciente",
    element: <InformacionPaciente />,
    errorElement: <RouteError />,
  },
  {
    path: "/consulta",
    element: <Consulta />,
    errorElement: <RouteError />,
  },
  {
    path: "/ficha_medica",
    element: <FichaMedica />,
    errorElement: <RouteError />,
  },
  {
    path: "/lista_consultas",
    element: <ListaConsultas />,
    errorElement: <RouteError />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
