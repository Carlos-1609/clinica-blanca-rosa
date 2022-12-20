import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import NavBar from "../ui/NavBar";

//Date Picker Imports
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

function InformacionPaciente() {
  const [startDate, setStartDate] = useState(new Date());

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
    </>
  );
}

export default InformacionPaciente;
