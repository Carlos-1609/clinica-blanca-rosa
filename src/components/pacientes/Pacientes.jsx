import React, { useEffect, useRef, useState } from "react";
import NavBar from "../ui/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faEye } from "@fortawesome/free-solid-svg-icons";
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
  onBackPacientes,
  onNextPacientes,
  startLoadingPacientes,
} from "../../store/pacientes/thunks";

const Pacientes = () => {
  const { pacientes, activePaciente, messageSaved, counter } = useSelector(
    (state) => state.pacientes
  );
  const [showDialog, setShowDialog] = useState(false);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
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
    let filter = pacientes.filter((paciente) => {
      return paciente.nombre
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim());
    });
    setFilteredPacientes(filter);
  }, 500);

  // const onNext = (type) => {
  //   dispatch(startLoadingPacientes(type));
  // };

  return (
    <>
      <NavBar />
      <div className="bg-white h-screen flex items-center justify-center flex-col">
        <div className="mb-7 xl:w-96 md:mt-10 mt-20">
          <input
            onChange={(e) => searchHandler(e.target.value)}
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
        <div className="overflow-auto md:w-12/12 w-11/12 rounded shadow-lg ">
          {filteredPacientes.length === 0 ? (
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
                {filteredPacientes.map((paciente, index) => {
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
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center mt-10 gap-20">
          <div className="">
            <button
              disabled={counter <= 0 ? true : false}
              className={`${
                counter <= 0
                  ? "opacity-40 transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
                  : "hover:bg-[#7f00ff] hover:text-white transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff]  font-semibold "
              }`}
              onClick={() => dispatch(onBackPacientes())}
            >
              Anterior
            </button>
          </div>
          <div>
            <button
              className="transition ease-in-out delay-50 bg-white shadow-lg h-11 w-24 border-[#7f00ff] rounded-lg border-2 text-[#7f00ff] hover:bg-[#7f00ff] hover:text-white hover:border-white font-semibold"
              onClick={() => dispatch(onNextPacientes())}
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
    </>
  );
};

export default Pacientes;
