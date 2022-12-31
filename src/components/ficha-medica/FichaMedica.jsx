import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearConsultaInfo,
  setConsultaInfo,
} from "../../store/consultas/consultasSlice";
import { startNewConsulta } from "../../store/consultas/thunks";

const FichaMedica = (props) => {
  const { consultaInfo } = useSelector((state) => state.consultas);
  const [values, setValues] = useState(consultaInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onCreateNuevaConsulta = (e) => {
    e.preventDefault();
    dispatch(setConsultaInfo(values));
    dispatch(startNewConsulta());
    dispatch(clearConsultaInfo());
    navigate("/lista_consultas");
    //console.log(values);
  };

  return (
    <>
      <div className="flex justify-between pr-4 text-3xl pl-4 mt-1">
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=""
            onClick={() => {
              // navigate(-1);
              console.log(values);
              dispatch(setConsultaInfo(values));
              props.setShowFichaMedica(false);
            }}
          />
        </span>
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faXmark}
            className=""
            onClick={() => {
              dispatch(clearConsultaInfo());
              navigate("/pacientes");
            }}
          />
        </span>
      </div>
      <div>
        <h1 className="font-bold text-xl text-center mt-3">Ficha Medica</h1>
        <div className="flex justify-center ">
          <div className="w-full max-w-4xl mx-10 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <label
                htmlFor="observaciones"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Observaciones
              </label>
              <textarea
                id="observaciones"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
                name="observaciones"
                value={values.observaciones}
                onChange={onHandleInputChange}
              ></textarea>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput
                  id={"avl_od"}
                  placeholder={"OD"}
                  label={"AVL-OD"}
                  name={"avl_od"}
                  value={values.avl_od}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  id={"avl_os"}
                  placeholder={"OS"}
                  label={"AVL-OS"}
                  name={"avl_os"}
                  value={values.avl_os}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  id={"pio_od"}
                  placeholder={"OD"}
                  label={"PIO-OD"}
                  name={"pio_od"}
                  value={values.pio_od}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  id={"pio_os"}
                  placeholder={"OS"}
                  label={"PIO-OS"}
                  name={"pio_os"}
                  value={values.pio_os}
                  onChange={onHandleInputChange}
                />
              </div>
            </form>
            <div className="flex flex-wrap -mx-3 mb-6 ">
              <label
                htmlFor="biomicroscopia"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Biomicroscopía
              </label>
              <textarea
                id="biomicroscopia"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
                name="biomicroscopia"
                value={values.biomicroscopia}
                onChange={onHandleInputChange}
              ></textarea>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 ">
              <label
                htmlFor="impresion_diagnostica"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Impresión Diagnostica
              </label>
              <textarea
                id="impresion_diagnostica"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
                name="impresion_diagnostica"
                value={values.impresion_diagnostica}
                onChange={onHandleInputChange}
              ></textarea>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 ">
              <label
                htmlFor="plan"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
              >
                Plan
              </label>
              <textarea
                id="plan"
                rows="4"
                className="shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                placeholder="..."
                name="plan"
                value={values.plan}
                onChange={onHandleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-10 pr-10 pb-5">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
          onClick={(e) => {
            e.preventDefault();
            dispatch(clearConsultaInfo());
          }}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={(e) => {
            onCreateNuevaConsulta(e);
          }}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default FichaMedica;
