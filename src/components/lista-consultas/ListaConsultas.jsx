import React, { useEffect, useState } from "react";
import NavBar from "../ui/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFolderPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import patientRecord from "../../assets/medicalrecords.png";
import { useDispatch, useSelector } from "react-redux";
import { useLoadConsultas } from "../../hooks/useLoadConsultas";
import debounce from "lodash.debounce";
import { Loader } from "../ui/Loader";
import {
  deleteConsulta,
  onBackConsulta,
  onNextConsulta,
  startLoadingConsultas,
} from "../../store/consultas/thunks";
import {
  setActiveConsulta,
  setConsultaInfo,
  setTypeAction,
} from "../../store/consultas/consultasSlice";
import DeleteAlert from "../ui/deleteAlert";

const ListaConsultas = () => {
  const [deletePopUp, setDeletePopUp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counter, consultas, isSavingConsulta } = useSelector(
    (state) => state.consultas
  );
  const [nombre, setNombre] = useState("");
  const loadConsultas = useLoadConsultas();
  const addConsulta = () => {
    navigate("/consulta");
  };

  const onDeleteConsulta = () => {
    dispatch(deleteConsulta());
    setDeletePopUp(false);
  };

  return (
    <>
      <NavBar />
      <div className=" bg-white h-screen flex items-center justify-center flex-col">
        {isSavingConsulta ? (
          <Loader />
        ) : (
          <div className="overflow-auto md:w-12/12 w-11/12 rounded shadow-lg ">
            {consultas.length === 0 ? (
              <div className="flex justify-center flex-col items-center">
                <div className="h-20 w-20 ">
                  <img src={patientRecord} alt="" />
                </div>
                <div className="p-3 font-mono font-bold">
                  <h2>No existen consultas</h2>
                </div>
              </div>
            ) : (
              <table className=" w-full mb-0">
                <thead className="bg-[#333333] border-b ">
                  <tr className="">
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      ID Consulta
                    </th>
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      Accion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((consulta, index) => {
                    return (
                      <tr
                        key={consulta.id}
                        className={`${
                          index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                        } border-b`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 font-mono">
                          {consulta.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-mono">
                          {consulta.nombrePaciente}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-mono">
                          {consulta.fecha}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-mono">
                          <div className="flex gap-7 ">
                            <div
                              className="text-xl text-cyan-500 cursor-pointer"
                              onClick={() => {
                                dispatch(setActiveConsulta(consulta));
                                dispatch(setConsultaInfo(consulta));
                                dispatch(setTypeAction("view"));
                                // setIsEditable(true);
                                // setShowDialog(!showDialog);
                                navigate("/consulta");
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </div>
                            <div
                              className="text-xl text-yellow-500 cursor-pointer"
                              onClick={() => {
                                // dispatch(setActivePaciente(paciente));
                                // setIsEditable(false);
                                // setShowDialog(!showDialog);
                                dispatch(setActiveConsulta(consulta));
                                dispatch(setConsultaInfo(consulta));
                                dispatch(setTypeAction("update"));
                                navigate("/consulta");
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </div>

                            <div
                              className="text-xl text-red-500 cursor-pointer"
                              onClick={() => {
                                // setDeletePopUp(true);
                                setDeletePopUp(true);
                                dispatch(setActiveConsulta(consulta));
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        <div className="flex justify-center mt-10 gap-20">
          <div className="">
            <button
              disabled={counter <= 0 ? true : false}
              className={`${
                counter <= 0
                  ? "opacity-40 transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
                  : "hover:bg-[#7f00ff] hover:text-white transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
              }`}
              onClick={() => dispatch(onBackConsulta(nombre))}
            >
              Anterior
            </button>
          </div>
          <div>
            <button
              disabled={consultas.length <= 0 ? true : false}
              className={`${
                consultas.length <= 0
                  ? "opacity-40 transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
                  : "hover:bg-[#7f00ff] hover:text-white transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
              }`}
              onClick={() => dispatch(onNextConsulta(nombre))}
            >
              Siguiente
            </button>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 ">
          <div
            onClick={addConsulta}
            className="cursor-pointer transition ease-in-out delay-50 hover:bg-green-900 bg-green-500 rounded-full h-16 w-16 sticky flex justify-center items-center"
          >
            <div className=" text-white text-3xl ">
              <FontAwesomeIcon icon={faFolderPlus} />
            </div>
          </div>
        </div>
      </div>
      {deletePopUp && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-scroll">
          <div className="w-full max-w-4xl mx-10">
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:mt-10 border ">
              <h1 className="font-bold text-xl text-center mb-4">
                ¿Esta Seguro(a) que quieres eliminar la consulta del paciente?
              </h1>
              <div className="flex justify-center gap-16 ">
                <div>
                  <button
                    onClick={onDeleteConsulta}
                    className="bg-green-600 rounded-md w-32 h-12 shadow-md hover:bg-green-500 transition ease-in text-white font-bold"
                  >
                    Si, Eliminar
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setDeletePopUp(false);
                    }}
                    className="bg-red-600 rounded-md w-32 h-12 shadow-md hover:bg-red-400 transition ease-in text-white font-bold "
                  >
                    No, Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListaConsultas;
