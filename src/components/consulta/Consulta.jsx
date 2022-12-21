import React from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const Consulta = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end pr-4 text-3xl mt-1">
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              navigate("/lista_consultas");
            }}
          />
        </span>
      </div>
      <div className="">
        <h1 className="font-bold text-xl text-center mt-3">
          Información General
        </h1>
        <div className="flex justify-center ">
          <div className="w-full max-w-4xl mx-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="motivo_consulta"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Motivo Consulta
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
                Antecedentes
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"DM"} placeholder={"DM"} label={"DM"} />
                <FormInput id={"HTA"} placeholder={"HTA"} label={"HTA"} />
                <FormInput
                  id={"glaucoma"}
                  placeholder={"Glaucoma"}
                  label={"Glaucoma"}
                />
                <FormInput
                  id={"trauma_ocular"}
                  placeholder={"Trauma Ocular"}
                  label={"Trauma Ocular"}
                />
                <FormInput
                  id={"cirugias"}
                  placeholder={"Cirugias"}
                  label={"Cirugias"}
                />
                <FormInput id={"otros"} placeholder={"Otros"} label={"Otros"} />
              </div>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Agudeza Visual
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6 ">
                <FormInput
                  id={"avsc_od"}
                  placeholder={"OD"}
                  label={"AV SC - OD"}
                />
                <FormInput
                  id={"avsc_os"}
                  placeholder={"OS"}
                  label={"AV SC - OS"}
                />

                <FormInput
                  id={"avph_od"}
                  placeholder={"OD"}
                  label={"AV PH - OD"}
                />
                <FormInput
                  id={"avph_os"}
                  placeholder={"OS"}
                  label={"AV PH - OS"}
                />

                <FormInput
                  id={"avcc_od"}
                  placeholder={"OD"}
                  label={"AV CC - OD"}
                />
                <FormInput
                  id={"avcc_os"}
                  placeholder={"OS"}
                  label={"AV CC - OS"}
                />

                <FormInput
                  id={"lerca_od"}
                  placeholder={"OD"}
                  label={"Lerca - OD"}
                />
                <FormInput
                  id={"lerca_os"}
                  placeholder={"OS"}
                  label={"Lerca - OS"}
                />
              </div>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Lensometria
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"od_lens"} placeholder={"OD"} label={"OD"} />
                <FormInput id={"os_lens"} placeholder={"OS"} label={"OS"} />
                <FormInput
                  id={"tipo_lente"}
                  placeholder={"Tipo de Lente"}
                  label={"Tipo de Lente"}
                />
              </div>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Auto retracto metro / objetiva
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"od_ret"} placeholder={"OD"} label={"OD"} />
                <FormInput id={"os_ret"} placeholder={"OS"} label={"OS"} />
              </div>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Subjetiva
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"od_sub"} placeholder={"OD"} label={"OD"} />
                <FormInput id={"os_sub"} placeholder={"OS"} label={"OS"} />
                <FormInput id={"ad_sub"} placeholder={"AD"} label={"AD"} />
              </div>
            </form>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                Keratometria
              </h1>
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput id={"od_kera"} placeholder={"OD"} label={"OD"} />
                <FormInput id={"os_kera"} placeholder={"OS"} label={"OS"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-10 pb-5">
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

export default Consulta;
