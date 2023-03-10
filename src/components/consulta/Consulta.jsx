import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FichaMedica from "../ficha-medica/FichaMedica";
import { useDispatch, useSelector } from "react-redux";
import {
  clearConsultaInfo,
  setActiveConsulta,
  setConsultaInfo,
  setOnBackPage,
  setTypeAction,
} from "../../store/consultas/consultasSlice";
import { onNextPacientes } from "../../store/pacientes/thunks";
import { PacienteDialog } from "../ui/PacienteDialog";
import { Timestamp } from "firebase/firestore";

const Consulta = (props) => {
  const initialValues = {
    idPaciente: "",
    nombrePaciente: "",
    fecha: "",
    motivo: "",
    dm: "",
    hta: "",
    glaucoma: "",
    trauma_ocular: "",
    cirugias: "",
    otros: "",
    av_sc_od: "",
    av_sc_os: "",
    av_ph_od: "",
    av_ph_os: "",
    av_cc_od: "",
    av_cc_os: "",
    lerca_od: "",
    lerca_os: "",
    lenso_od: "",
    lenso_os: "",
    lenso_tipo_lente: "",
    retracto_od: "",
    retracto_os: "",
    subjetiva_od: "",
    subjetiva_os: "",
    subjetiva_ad: "",
    kera_od: "",
    kera_os: "",
    observaciones: "",
    avl_od: "",
    avl_os: "",
    pio_od: "",
    pio_os: "",
    biomicroscopia: "",
    impresion_diagnostica: "",
    plan: "",
    createdAt: null,
  };
  const [values, setValues] = useState(initialValues);
  const [showFichaMedica, setShowFichaMedica] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { consultaInfo, typeAction, activeConsulta, onBackPage } = useSelector(
    (state) => state.consultas
  );
  const { activePaciente } = useSelector((state) => state.pacientes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onNext = (e) => {
    e.preventDefault();
    dispatch(setOnBackPage(false));

    dispatch(setConsultaInfo(values));
    setShowFichaMedica(true);
  };

  useEffect(() => {
    if (typeAction === null) {
      setValues(consultaInfo);
    } else {
      if (onBackPage) {
        dispatch(setActiveConsulta(consultaInfo));
        dispatch(setOnBackPage(false));
        setValues(consultaInfo);
      } else {
        setValues(activeConsulta);
      }
    }
  }, [consultaInfo, onBackPage]);

  return (
    <>
      {showFichaMedica ? (
        <FichaMedica
          setShowFichaMedica={setShowFichaMedica}
          infoConsulta={values}
        />
      ) : (
        <>
          <div className="flex justify-between pr-4 text-4xl mt-1">
            <span
              className="text-[#7f00ff] cursor-pointer ml-3"
              onClick={() => setShowDialog(true)}
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
            <span className="text-[#7f00ff] cursor-pointer">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  dispatch(clearConsultaInfo());
                  dispatch(setActiveConsulta(null));
                  dispatch(setTypeAction(null));
                  dispatch(setOnBackPage(false));
                  navigate("/lista_consultas");
                }}
              />
            </span>
          </div>
          <div className="">
            <h1 className="font-bold text-xl text-center mt-3">
              Informaci??n General
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
                    disabled={
                      typeAction === null || typeAction === "update"
                        ? false
                        : true
                    }
                    id="motivo"
                    name="motivo"
                    rows="4"
                    className={`shadow block w-full ${
                      typeAction === null || typeAction === "update"
                        ? "bg-white"
                        : "bg-gray-200"
                    } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
                    placeholder="..."
                    value={values.motivo}
                    onChange={onHandleInputChange}
                  ></textarea>
                </div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Antecedentes
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"dm"}
                      placeholder={"DM"}
                      label={"DM"}
                      name={"dm"}
                      value={values.dm}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"hta"}
                      placeholder={"HTA"}
                      label={"HTA"}
                      name={"hta"}
                      value={values.hta}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"glaucoma"}
                      placeholder={"Glaucoma"}
                      label={"Glaucoma"}
                      name={"glaucoma"}
                      value={values.glaucoma}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"trauma_ocular"}
                      placeholder={"Trauma Ocular"}
                      label={"Trauma Ocular"}
                      name={"trauma_ocular"}
                      value={values.trauma_ocular}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"cirugias"}
                      placeholder={"Cirugias"}
                      label={"Cirugias"}
                      name={"cirugias"}
                      value={values.cirugias}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"otros"}
                      placeholder={"Otros"}
                      label={"Otros"}
                      name={"otros"}
                      value={values.otros}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Agudeza Visual
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6 ">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_sc_od"}
                      placeholder={"OD"}
                      label={"AV SC - OD"}
                      name={"av_sc_od"}
                      value={values.av_sc_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_sc_os"}
                      placeholder={"OS"}
                      label={"AV SC - OS"}
                      name={"av_sc_os"}
                      value={values.av_sc_os}
                      onChange={onHandleInputChange}
                    />

                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_ph_od"}
                      placeholder={"OD"}
                      label={"AV PH - OD"}
                      name={"av_ph_od"}
                      value={values.av_ph_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_ph_os"}
                      placeholder={"OS"}
                      label={"AV PH - OS"}
                      name={"av_ph_os"}
                      value={values.av_ph_os}
                      onChange={onHandleInputChange}
                    />

                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_cc_od"}
                      placeholder={"OD"}
                      label={"AV CC - OD"}
                      name={"av_cc_od"}
                      value={values.av_cc_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"av_cc_os"}
                      placeholder={"OS"}
                      label={"AV CC - OS"}
                      name={"av_cc_os"}
                      value={values.av_cc_os}
                      onChange={onHandleInputChange}
                    />

                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"lerca_od"}
                      placeholder={"OD"}
                      label={"Cerca - OD"}
                      name={"lerca_od"}
                      value={values.lerca_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"lerca_os"}
                      placeholder={"OS"}
                      label={"Cerca - OS"}
                      name={"lerca_os"}
                      value={values.lerca_os}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Lensometria
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"lenso_od"}
                      placeholder={"OD"}
                      label={"OD"}
                      name={"lenso_od"}
                      value={values.lenso_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"lenso_os"}
                      placeholder={"OS"}
                      label={"OS"}
                      name={"lenso_os"}
                      value={values.lenso_os}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"lenso_tipo_lente"}
                      placeholder={"Tipo de Lente"}
                      label={"Tipo de Lente"}
                      name={"lenso_tipo_lente"}
                      value={values.lenso_tipo_lente}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Auto refractometro / objetiva
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"retracto_od"}
                      placeholder={"OD"}
                      label={"OD"}
                      name={"retracto_od"}
                      value={values.retracto_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"retracto_os"}
                      placeholder={"OS"}
                      label={"OS"}
                      name={"retracto_os"}
                      value={values.retracto_os}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Subjetiva
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"subjetiva_od"}
                      placeholder={"OD"}
                      label={"OD"}
                      name={"subjetiva_od"}
                      value={values.subjetiva_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"subjetiva_os"}
                      placeholder={"OS"}
                      label={"OS"}
                      name={"subjetiva_os"}
                      value={values.subjetiva_os}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"subjetiva_ad"}
                      placeholder={"AD"}
                      label={"AD"}
                      name={"subjetiva_ad"}
                      value={values.subjetiva_ad}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
                  <h1 className="font-bold text-xl text-center mb-4 sm:mb-0">
                    Keratometria
                  </h1>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"kera_od"}
                      placeholder={"OD"}
                      label={"OD"}
                      name={"kera_od"}
                      value={values.kera_od}
                      onChange={onHandleInputChange}
                    />
                    <FormInput
                      disabled={
                        typeAction === null || typeAction === "update"
                          ? false
                          : true
                      }
                      id={"kera_os"}
                      placeholder={"OS"}
                      label={"OS"}
                      name={"kera_os"}
                      value={values.kera_os}
                      onChange={onHandleInputChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-10 pb-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                onNext(e);
              }}
            >
              Siguiente
            </button>
          </div>
          {showDialog && (
            <PacienteDialog
              setShowDialog={setShowDialog}
              activePaciente={activePaciente}
              isEditable={true}
            />
          )}
        </>
      )}
    </>
  );
};

export default Consulta;
