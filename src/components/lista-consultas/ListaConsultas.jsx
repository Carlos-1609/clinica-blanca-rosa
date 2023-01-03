import React, { useEffect, useState } from "react";
import NavBar from "../ui/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Switcher from "../ui/Switcher";
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
  const [filteredConsultas, setFilteredConsultas] = useState([]);
  const [nombre, setNombre] = useState("");
  const loadConsultas = useLoadConsultas();
  useEffect(() => {
    setFilteredConsultas([...consultas]);
    return () => {
      searchHandler.cancel();
    };
    console.log(consultas);
  }, [consultas]);

  const searchHandler = debounce((searchValue) => {
    // let filter = pacientes.filter((paciente) => {
    //   return paciente.nombre
    //     .toLowerCase()
    //     .trim()
    //     .includes(searchValue.toLowerCase().trim());
    // });
    // setFilteredPacientes(filter);
    setNombre(searchValue);
    dispatch(startLoadingConsultas(searchValue));
  }, 800);

  return (
    <>
      <NavBar />
      <div className=" bg-white h-screen flex items-center justify-center flex-col">
        <div className="">
          <div className="mb-7 xl:w-96 md:mt-10 mt-20">
            <input
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
              type="text"
              className="
                form-control
                rounded-md
                shadow-md
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-[#7f00ff] focus:outline-none"
              id="buscarPaciente"
              placeholder="Paciente"
            />
          </div>
        </div>
        {isSavingConsulta ? (
          <Loader />
        ) : (
          <div className="overflow-auto md:w-12/12 w-11/12 rounded shadow-lg ">
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
      </div>
    </>
  );
};

export default ListaConsultas;
