import React, { useEffect, useState } from "react";
import FormInput from "../ui/FormInput";
import NavBar from "../ui/NavBar";

//Date Picker Imports
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { startNewPaciente } from "../../store/pacientes/thunks";
import { Loader } from "../ui/Loader";

const initialValues = {
  identidad: "",
  nombre: "",
  edad: "",
  sexo: "",
  escolaridad: "",
  domicilio: "",
  telefono: "",
  referido: "",
  fecha: new Date().toLocaleDateString("es-es"),
  ocupacion: "",
  email: "",
  imageUrls: [],
};

function InformacionPaciente() {
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [arrImg, setArrImg] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [sexo, setSexo] = useState("");
  const { isSaving, messageInsert } = useSelector((state) => state.pacientes);
  const dispatch = useDispatch();

  const onHandleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onHandleSexoInputChange = (e) => {
    console.log(e.target.value);
    setSexo(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onHandleFechaChange = (date) => {
    setStartDate(date);
    setFormattedDate(date.toLocaleDateString("es-es"));
  };

  const onClickNewPaciente = (e) => {
    e.preventDefault();
    dispatch(startNewPaciente({ values, formattedDate }));
  };

  // useEffect(() => {
  //   if (messageInsert.length > 0) {
  //     Swal.fire("Paciente Registrado", messageInsert, "success");
  //   }
  // }, [messageInsert]);

  return (
    <>
      <NavBar />

      <div className="flex justify-center md:mt-28 mt-20">
        <div className="w-full max-w-4xl mx-10">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-8 border">
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
              />

              <FormInput
                id={"nombre"}
                name={"nombre"}
                placeholder={"Nombre"}
                label={"Nombre"}
                value={values.nombre}
                onChange={onHandleInputChange}
              />
              <FormInput
                id={"edad"}
                name={"edad"}
                placeholder={"Edad"}
                label={"Edad"}
                value={values.edad}
                onChange={onHandleInputChange}
              />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
                  htmlFor="sexo"
                >
                  Sexo
                </label>
                <select
                  name="sexo"
                  className="appearance-none uppercase shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                  id="sexo"
                  defaultValue={"DEFAULT"}
                  onChange={onHandleSexoInputChange}
                >
                  <option value="DEFAULT" disabled>
                    Seleccione Sexo
                  </option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
              </div>
              <FormInput
                name={"escolaridad"}
                id={"escolaridad"}
                placeholder={"Escolaridad"}
                label={"Escolaridad"}
                value={values.escolaridad}
                onChange={onHandleInputChange}
              />
              <FormInput
                id={"domicilio"}
                name={"domicilio"}
                placeholder={"Domicilio"}
                label={"Domicilio"}
                value={values.domicilio}
                onChange={onHandleInputChange}
              />
              <FormInput
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
              />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2">
                  Fecha
                </label>
                <ReactDatePicker
                  dateFormat={"dd/MM/yyyy"}
                  selected={startDate}
                  onChange={onHandleFechaChange}
                  className="appearance-none shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                />
              </div>
              <FormInput
                id={"ocupacion"}
                placeholder={"Ocupación"}
                name={"ocupacion"}
                label={"Ocupación"}
                value={values.ocupacion}
                onChange={onHandleInputChange}
              />
              <FormInput
                id={"email"}
                name={"email"}
                placeholder={"E-mail"}
                label={"E-mail"}
                value={values.email}
                onChange={onHandleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) => e.preventDefault()}
              >
                Cancelar
              </button>
              <button
                disabled={isSaving}
                className={`${
                  isSaving ? "bg-[#98b5e4]" : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
                onClick={onClickNewPaciente}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
      {isSaving ? (
        <div className="flex justify-center items-center">
          <Loader fullScreen={true} />
        </div>
      ) : null}
    </>
  );
}

export default InformacionPaciente;
