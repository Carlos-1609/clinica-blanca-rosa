import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearConsultaInfo,
  setActiveConsulta,
  setConsultaInfo,
  setOnBackPage,
  setTypeAction,
  updateConsulta,
} from "../../store/consultas/consultasSlice";
import {
  startNewConsulta,
  startUpdateConsulta,
} from "../../store/consultas/thunks";

const FichaMedica = (props) => {
  const { consultaInfo, typeAction, activeConsulta } = useSelector(
    (state) => state.consultas
  );
  const [values, setValues] = useState(consultaInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onCreateNuevaConsulta = (e) => {
    e.preventDefault();
    console.log("esto es create");
    dispatch(setConsultaInfo(values));
    dispatch(startNewConsulta());
    dispatch(clearConsultaInfo());
    dispatch(setOnBackPage(false));
    navigate("/lista_consultas");
  };

  const onUpdateConsulta = (e) => {
    e.preventDefault();
    console.log("esto es update");
    dispatch(setConsultaInfo(values));
    dispatch(startUpdateConsulta());
    dispatch(clearConsultaInfo());
    dispatch(setOnBackPage(false));
    navigate("/lista_consultas");
  };

  return (
    <>
      <div className="flex justify-between pr-4 text-4xl pl-4 mt-1">
        <span className="text-[#7f00ff]">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=""
            onClick={() => {
              // navigate(-1);
              console.log(values);
              dispatch(setOnBackPage(true));
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
              dispatch(setActiveConsulta(null));
              dispatch(setTypeAction(null));
              dispatch(setOnBackPage(false));
              dispatch(clearConsultaInfo());
              navigate("/lista_consultas");
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
                disabled={
                  typeAction === null || typeAction === "update" ? false : true
                }
                id="observaciones"
                rows="4"
                className={`shadow block w-full ${
                  typeAction === null || typeAction === "update"
                    ? "bg-white"
                    : "bg-gray-200"
                } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
                placeholder="..."
                name="observaciones"
                value={values.observaciones}
                onChange={onHandleInputChange}
              ></textarea>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
              <div className="flex flex-wrap -mx-3 mb-6">
                <FormInput
                  disabled={
                    typeAction === null || typeAction === "update"
                      ? false
                      : true
                  }
                  id={"avl_od"}
                  placeholder={"OD"}
                  label={"AVL-OD"}
                  name={"avl_od"}
                  value={values.avl_od}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  disabled={
                    typeAction === null || typeAction === "update"
                      ? false
                      : true
                  }
                  id={"avl_os"}
                  placeholder={"OS"}
                  label={"AVL-OS"}
                  name={"avl_os"}
                  value={values.avl_os}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  disabled={
                    typeAction === null || typeAction === "update"
                      ? false
                      : true
                  }
                  id={"pio_od"}
                  placeholder={"OD"}
                  label={"PIO-OD"}
                  name={"pio_od"}
                  value={values.pio_od}
                  onChange={onHandleInputChange}
                />
                <FormInput
                  disabled={
                    typeAction === null || typeAction === "update"
                      ? false
                      : true
                  }
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
                disabled={
                  typeAction === null || typeAction === "update" ? false : true
                }
                id="biomicroscopia"
                rows="4"
                className={`shadow block w-full ${
                  typeAction === null || typeAction === "update"
                    ? "bg-white"
                    : "bg-gray-200"
                } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
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
                disabled={
                  typeAction === null || typeAction === "update" ? false : true
                }
                id="impresion_diagnostica"
                rows="4"
                className={`shadow block w-full ${
                  typeAction === null || typeAction === "update"
                    ? "bg-white"
                    : "bg-gray-200"
                } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
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
                disabled={
                  typeAction === null || typeAction === "update" ? false : true
                }
                id="plan"
                rows="4"
                className={`shadow block w-full ${
                  typeAction === null || typeAction === "update"
                    ? "bg-white"
                    : "bg-gray-200"
                } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
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
            navigate("/lista_consultas");
          }}
        >
          Cancelar
        </button>
        <button
          disabled={
            typeAction === null || typeAction === "update" ? false : true
          }
          className={`${
            typeAction === null || typeAction === "update"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-400"
          }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          onClick={(e) => {
            if (typeAction === "update") {
              onUpdateConsulta(e);
            } else {
              onCreateNuevaConsulta(e);
            }
          }}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default FichaMedica;
