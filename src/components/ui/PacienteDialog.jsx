import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderPlus,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
//Carrousel Imports
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FormInput from "./FormInput";
import { Loader } from "./Loader";
import {
  startUpdatePaciente,
  startUploadingFiles,
} from "../../store/pacientes/thunks";

export const PacienteDialog = (props) => {
  const initialValues = {
    id: props.activePaciente.id,
    identidad: props.activePaciente.identidad,
    nombre: props.activePaciente.nombre,
    edad: props.activePaciente.edad,
    sexo: props.activePaciente.sexo,
    escolaridad: props.activePaciente.escolaridad,
    domicilio: props.activePaciente.domicilio,
    telefono: props.activePaciente.telefono,
    referido: props.activePaciente.referido,
    fecha: props.activePaciente.fecha,
    ocupacion: props.activePaciente.ocupacion,
    email: props.activePaciente.email,
    imageUrls: [...props.activePaciente.imageUrls],
  };
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [arrImg, setArrImg] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [escolaridad, setEscolaridad] = useState("");
  const [sexo, setSexo] = useState("");
  const { isSaving, activePaciente } = useSelector((state) => state.pacientes);
  const dispatch = useDispatch();

  const onHandleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onHandleSexoInputChange = (e) => {
    console.log(e.target.value);
    setSexo(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onHandleEscolaridadInputChange = (e) => {
    setEscolaridad(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onHandleEdadInputChange = (e) => {
    const edadValidated = e.target.value.replace(/\D/g, "");

    setEscolaridad(edadValidated);
    setValues({ ...values, [e.target.name]: edadValidated });
  };

  const onHandleFechaChange = (date) => {
    setStartDate(date);
    setFormattedDate(date.toLocaleDateString("es-es"));
  };

  const imageUploadHandler = (event) => {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    if (!/^image\//.test(file.type)) {
      alert(`File ${file.name} no es una imagen.`);
      return false;
    }
    dispatch(startUploadingFiles(event.target.files));
  };

  const onClickUpdatePaciente = (e) => {
    e.preventDefault();
    dispatch(startUpdatePaciente(values));
    props.setShowDialog(false);
  };
  const deleteImage = async (e, index) => {
    // console.log(activePaciente.imageUrls[index].publicId);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-scroll">
        <div className="w-full max-w-4xl mx-10">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:mt-10 mt-[600px] border ">
            <h1 className="font-bold text-xl text-center mb-2">
              Datos del Paciente
            </h1>

            <div className="flex flex-wrap -mx-3 mb-6">
              <FormInput
                id={"identidad"}
                name={"identidad"}
                placeholder={"Identidad"}
                label={"Identidad"}
                value={values.identidad}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />

              <FormInput
                id={"nombre"}
                name={"nombre"}
                placeholder={"Nombre"}
                label={"Nombre"}
                value={values.nombre}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />
              <FormInput
                id={"edad"}
                name={"edad"}
                placeholder={"Edad"}
                label={"Edad"}
                value={values.edad}
                onChange={onHandleEdadInputChange}
                disabled={props.isEditable}
              />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
                  htmlFor="sexo"
                >
                  Sexo
                </label>
                <select
                  disabled={props.isEditable}
                  name="sexo"
                  className={`appearance-none uppercase shadow block w-full ${
                    !props.isEditable ? "bg-white" : "bg-gray-200"
                  } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
                  id="sexo"
                  defaultValue={values.sexo}
                  onChange={onHandleSexoInputChange}
                >
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
                  htmlFor="escolaridad"
                >
                  Escolaridad
                </label>
                <select
                  disabled={props.isEditable}
                  name="escolaridad"
                  className={`appearance-none uppercase shadow block w-full ${
                    !props.isEditable ? "bg-white" : "bg-gray-200"
                  } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
                  id="escolaridad"
                  defaultValue={values.escolaridad}
                  onChange={onHandleEscolaridadInputChange}
                >
                  <option>Primaria</option>
                  <option>Secundaria</option>
                  <option>Superior</option>
                </select>
              </div>
              <FormInput
                name={"escolaridad"}
                id={"escolaridad"}
                placeholder={"Escolaridad"}
                label={"Escolaridad"}
                value={values.escolaridad}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />
              <FormInput
                disabled={props.isEditable}
                id={"domicilio"}
                name={"domicilio"}
                placeholder={"Domicilio"}
                label={"Domicilio"}
                value={values.domicilio}
                onChange={onHandleInputChange}
              />
              <FormInput
                disabled={props.isEditable}
                id={"telefono"}
                name={"telefono"}
                placeholder={"Teléfono"}
                label={"Teléfono"}
                value={values.telefono}
                onChange={onHandleInputChange}
              />
              <FormInput
                id={"referido"}
                name={"referido"}
                placeholder={"Referido Por"}
                label={"Referido Por"}
                value={values.referido}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2">
                  Fecha
                </label>
                <ReactDatePicker
                  disabled={props.isEditable}
                  dateFormat={"dd/MM/yyyy"}
                  selected={startDate}
                  onChange={onHandleFechaChange}
                  className={`appearance-none shadow block w-full  ${
                    !props.isEditable ? "bg-white" : "bg-gray-200"
                  } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
                />
              </div>
              <FormInput
                id={"ocupacion"}
                placeholder={"Ocupación"}
                name={"ocupacion"}
                label={"Ocupación"}
                value={values.ocupacion}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />
              <FormInput
                id={"email"}
                name={"email"}
                placeholder={"E-mail"}
                label={"E-mail"}
                value={values.email}
                onChange={onHandleInputChange}
                disabled={props.isEditable}
              />
            </div>
            <div
              className="text-4xl text-cyan-500 flex justify-center md:mb-2 mb-5 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faImages} />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  props.setShowDialog(false);
                }}
              >
                Cancelar
              </button>
              {props.isEditable ? null : (
                <button
                  disabled={isSaving}
                  className={`${
                    isSaving ? "bg-[#98b5e4]" : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="submit"
                  onClick={onClickUpdatePaciente}
                >
                  Guardar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {showModal ? (
        <>
          {isSaving ? (
            <Loader fullScreen={true} />
          ) : (
            <>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-scroll">
                <div className="w-full max-w-4xl mx-10">
                  <div className="bg-[#2a2a2b]  shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:mt-10   border ">
                    <h1 className="font-bold text-xl text-center mb-2 text-white">
                      Imagenes del paciente
                    </h1>
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      swipeable={true}
                    >
                      {activePaciente.imageUrls.map((imagen, index) => {
                        return (
                          <div key={imagen.publicId}>
                            <div>
                              {/* <FontAwesomeIcon
                                icon={faTrash}
                                color="red"
                                onClick={(e) => deleteImage(e, index)}
                              /> */}
                              <img
                                className="h-96 w-96 object-contain "
                                src={imagen.privateUrl}
                                alt="Uploaded Image"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </Carousel>
                    {/* {activePaciente.imageUrls.length === 0 ? (
                  <div className="flex justify-center flex-col items-center">
                    <div>
                      <FontAwesomeIcon
                        className="text-[200px]"
                        color="cyan"
                        icon={faImage}
                      />
                    </div>
                    <div>
                      <h2 className="font-bold">
                        Este paciente no tiene imagenes
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center mx-3 my-3">
                    {activePaciente.imageUrls.map((imagen) => {
                      return (
                        <img
                          key={imagen}
                          className="h-44 w-44"
                          src={imagen}
                          alt="Uploaded Image"
                        />
                      );
                    })}
                  </div>
                )} */}
                    <div
                      className={`rounded-full ${
                        !props.isEditable ? "bg-cyan-400" : "bg-gray-400"
                      } h-16 w-16 fixed bottom-4 right-4`}
                    >
                      <form>
                        <label
                          htmlFor="imgs"
                          className="text-3xl cursor-pointer flex justify-center mt-4"
                        >
                          <FontAwesomeIcon color="white" icon={faFolderPlus} />
                        </label>
                        <input
                          disabled={props.isEditable}
                          id="imgs"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          multiple
                          onChange={imageUploadHandler}
                        ></input>
                      </form>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-full bg-red-500 h-16 w-16 text-3xl fixed bottom-4 left-4"
                    >
                      <FontAwesomeIcon color="white" icon={faXmark} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};
