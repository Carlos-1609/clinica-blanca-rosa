import React from "react";
import NavBar from "../ui/NavBar";

const ListaConsultas = () => {
  return (
    <>
      <NavBar />
      <div className=" bg-white h-screen flex items-center justify-center flex-col">
        <div className="mb-7 xl:w-96 md:mt-10">
          <input
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
              <tr className="bg-[#F9F9F9] border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  1
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Mark
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  12-19-2022
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Agregar, Ver, Actualizar
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  2
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Jacob
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  12-19-2022
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Agregar, Ver, Actualizar
                </td>
              </tr>
              <tr className="bg-[#F9F9F9] border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  3
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Mark
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  12-19-2022
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Agregar, Ver, Actualizar
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  4
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Jacob
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  12-19-2022
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Agregar, Ver, Actualizar
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
              <li className="page-item disabled">
                <a
                  className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                  href="#"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#"
                >
                  1
                </a>
              </li>
              <li className="page-item active">
                <a
                  className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                  href="#"
                >
                  2 <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#"
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  href="#"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ListaConsultas;
