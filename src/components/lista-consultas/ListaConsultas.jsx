import React, { useEffect, useState } from "react";
import NavBar from "../ui/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import patientRecord from "../../assets/medicalrecords.png";
import { useDispatch, useSelector } from "react-redux";
import { useLoadConsultas } from "../../hooks/useLoadConsultas";
import debounce from "lodash.debounce";
import { Loader } from "../ui/Loader";
import {
  onBackConsulta,
  onNextConsulta,
  startLoadingConsultas,
} from "../../store/consultas/thunks";
import {
  setActiveConsulta,
  setConsultaInfo,
  setTypeAction,
} from "../../store/consultas/consultasSlice";

const ListaConsultas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counter, consultas, isSavingConsulta } = useSelector(
    (state) => state.consultas
  );
  const [nombre, setNombre] = useState("");
  const loadConsultas = useLoadConsultas();
  const addConsulta = () =>{
    navigate('/consulta');
  }

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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {consulta.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {consulta.nombrePaciente}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {consulta.fecha}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-7 ">
                            <div
                              className="text-xl text-cyan-500 cursor-pointer"
                              onClick={() => {
                                console.log(consulta);
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
              disabled={
                consultas.length <= 0
                  ? true
                  : consultas.length < 5
                  ? true
                  : false
              }
              className={`${
                consultas.length <= 0
                  ? "opacity-40 transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
                  : consultas.length < 5
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
          <div onClick={addConsulta} className="cursor-pointer transition ease-in-out delay-50 hover:bg-green-900 bg-green-500 rounded-full h-16 w-16 sticky flex justify-center items-center" >
            <div className=" text-white text-3xl ">
              <FontAwesomeIcon icon={faFolderPlus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaConsultas;
