import React from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const FichaMedica = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between pr-4 text-3xl pl-4 mt-1">
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=""
            onClick={() => {
              navigate(-1);
            }}
          />
        </span>
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faXmark}
            className=""
            onClick={() => {
              console.log("ALOHA");
              navigate("/pacientes");
            }}
          />
        </span>
      </div>
      <div>
        <h1 className="font-bold text-xl text-center mt-3">Ficha Medica</h1>
        <div className="flex justify-center ">
          <div className="w-full max-w-4xl mx-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="motivo_consulta"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Observaciones
              </label>
              <textarea
                id="message"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
              ></textarea>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Agudeza Visual
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"od_avl"} placeholder={"OD"} label={"AVL-OD"} />
                <FormInput id={"os_avl"} placeholder={"OS"} label={"AVL-OS"} />
                <FormInput id={"ad_pio"} placeholder={"OD"} label={"PIO-OD"} />
                <FormInput id={"od_pio"} placeholder={"OS"} label={"PIO-OS"} />
              </div>
            </form>
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="motivo_consulta"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Biomicroscopía
              </label>
              <textarea
                id="message"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
              ></textarea>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="motivo_consulta"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Impresión Diagnostica
              </label>
              <textarea
                id="message"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
              ></textarea>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="motivo_consulta"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Plan
              </label>
              <textarea
                id="message"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-10 pb-5">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate("/ficha_medica");
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default FichaMedica;
