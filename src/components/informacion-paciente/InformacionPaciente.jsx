import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import NavBar from "../ui/NavBar";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

//Date Picker Imports
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

function InformacionPaciente() {
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [arrImg, setArrImg] = useState([]);

  const imageUploadHandler = (event) => {
    let img = URL.createObjectURL(event.target.files[0]);
    console.log("pito 1", img);
    if (img !== null) {
      setArrImg([...arrImg, img]);
      console.log(arrImg);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center md:mt-28 mt-20">
        <div className="w-full max-w-4xl mx-10">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="font-bold text-xl text-center mb-2">
              Información General
            </h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <FormInput
                id={"identidad"}
                placeholder={"Identidad"}
                label={"Identidad"}
              />

              <FormInput
                id={"nombre"}
                placeholder={"Nombre"}
                label={"Nombre"}
              />
              <FormInput id={"edad"} placeholder={"Edad"} label={"Edad"} />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2 "
                  htmlFor="sexo"
                >
                  Sexo
                </label>
                <select
                  className="appearance-none uppercase shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                  id="sexo"
                  defaultValue={"DEFAULT"}
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
                id={"escolaridad"}
                placeholder={"Escolaridad"}
                label={"Escolaridad"}
              />
              <FormInput
                id={"domicilio"}
                placeholder={"Domicilio"}
                label={"Domicilio"}
              />
              <FormInput
                id={"telefono"}
                placeholder={"Teléfono"}
                label={"Teléfono"}
              />
              <FormInput
                id={"referido"}
                placeholder={"Referido Por"}
                label={"Referido Por"}
              />
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2">
                  Fecha
                </label>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="appearance-none shadow block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]"
                />
              </div>
              <FormInput
                id={"ocupacion"}
                placeholder={"Ocupación"}
                label={"Ocupación"}
              />
              <FormInput id={"email"} placeholder={"E-mail"} label={"E-mail"} />
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
                type="submit"
                onClick={(e) => e.preventDefault()}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) => e.preventDefault()}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Imagenes de paciente
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div>
                  {arrImg.length === 0
                    ? "No hay imagenes"
                    : arrImg.map((imagen) => {
                        return (
                          <img
                            key={imagen}
                            className="h-36 w-36"
                            src={imagen}
                            alt="Uploaded Image"
                          />
                        );
                      })}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cerrar
                  </button>
                  <div>
                    <form>
                      <label
                        htmlFor="imgs"
                        className="text-3xl text-emerald-600 hover:text-emerald-400 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faFolderPlus} />
                      </label>
                      <input
                        id="imgs"
                        type="file"
                        className="hidden"
                        onChange={imageUploadHandler}
                      ></input>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default InformacionPaciente;
