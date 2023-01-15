import React, { useEffect, useRef, useState } from "react";
import NavBar from "../ui/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faFolderPlus,
  faEye,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import patientRecord from "../../assets/medicalrecords.png";
import { useLoadPacientes } from "../../hooks/useLoadPacientes";
import debounce from "lodash.debounce";
import { setActivePaciente } from "../../store/pacientes/pacientesSlice";
import { PacienteDialog } from "../ui/PacienteDialog";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  deletePaciente,
  onBackPacientes,
  onNextPacientes,
  startLoadingPacientes,
} from "../../store/pacientes/thunks";
import { Loader } from "../ui/Loader";

const Pacientes = () => {
  const { pacientes, activePaciente, messageSaved, counter, isSaving } =
    useSelector((state) => state.pacientes);
  const [showDialog, setShowDialog] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadPacientes = useLoadPacientes();

  useEffect(() => {
    setFilteredPacientes([...pacientes]);
    return () => {
      searchHandler.cancel();
    };
  }, [pacientes]);

  const searchHandler = debounce((searchValue) => {
    setNombre(searchValue);
    dispatch(startLoadingPacientes(searchValue));
  }, 800);

  const onDeletePaciente = () => {
    dispatch(deletePaciente());
    setDeletePopUp(false);
  };

  return (
    <>
      <NavBar />
      <div className="bg-white h-screen flex items-center justify-center flex-col">
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
        {isSaving ? (
          <Loader />
        ) : (
          <div className="overflow-auto md:w-12/12 w-11/12 rounded shadow-lg ">
            {pacientes.length === 0 ? (
              <div className="flex justify-center flex-col items-center">
                <div className="h-20 w-20 ">
                  <img src={patientRecord} alt="" />
                </div>
                <div className="p-3 font-mono font-bold">
                  <h2>No existen pacientes</h2>
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
                      Identidad
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
                      Edad
                    </th>
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      Sexo
                    </th>
                    <th
                      scope="col"
                      className="text-md font-mono text-white px-6 py-4 text-left"
                    >
                      Telefono
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
                      Email
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
                  {pacientes.map((paciente, index) => {
                    return (
                      <tr
                        key={paciente.id}
                        className={`${
                          index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                        } border-b`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {paciente.identidad}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.nombre}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.edad}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.sexo}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.telefono}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.fecha}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {paciente.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-7 ">
                            <div
                              className="text-xl text-green-500 cursor-pointer"
                              onClick={() => {
                                dispatch(setActivePaciente(paciente));

                                navigate("/consulta");
                              }}
                            >
                              <FontAwesomeIcon icon={faFolderPlus} />
                            </div>
                            <div
                              className="text-xl text-cyan-500 cursor-pointer"
                              onClick={() => {
                                dispatch(setActivePaciente(paciente));
                                setIsEditable(true);
                                setShowDialog(!showDialog);
                                //navigate("/informacion_paciente");
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </div>
                            <div
                              className="text-xl text-yellow-500 cursor-pointer"
                              onClick={() => {
                                dispatch(setActivePaciente(paciente));
                                setIsEditable(false);
                                setShowDialog(!showDialog);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </div>
                            <div
                              className="text-xl text-sky-900 cursor-pointer"
                              onClick={() => {
                                dispatch(setActivePaciente(paciente));
                                navigate("/lista_consultas");
                              }}
                            >
                              <FontAwesomeIcon icon={faLayerGroup} />
                            </div>
                            <div
                              className="text-xl text-red-500 cursor-pointer"
                              onClick={() => {
                                dispatch(setActivePaciente(paciente));
                                setDeletePopUp(true);
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
              onClick={() => dispatch(onBackPacientes(nombre))}
            >
              Anterior
            </button>
          </div>
          <div>
            {/* <button
              className="transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff] hover:bg-[#7f00ff] hover:text-white hover:border-white font-semibold"
              onClick={() => dispatch(onNextPacientes())}
            >
              Siguiente
            </button> */}
            <button
              disabled={pacientes.length <= 0 ? true : false}
              className={`${
                pacientes.length <= 0
                  ? "opacity-40 transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
                  : "hover:bg-[#7f00ff] hover:text-white transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
              }`}
              onClick={() => dispatch(onNextPacientes(nombre))}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {showDialog && (
        <PacienteDialog
          setShowDialog={setShowDialog}
          activePaciente={activePaciente}
          isEditable={isEditable}
        />
      )}
      {deletePopUp && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-scroll">
          <div className="w-full max-w-4xl mx-10">
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:mt-10 border ">
              <h1 className="font-bold text-xl text-center mb-4">
                ¿Esta Seguro(a) que quieres eliminar al paciente y sus
                consultas?
              </h1>
              <div className="flex justify-center gap-16 ">
                <div>
                  <button
                    onClick={onDeletePaciente}
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

export default Pacientes;
