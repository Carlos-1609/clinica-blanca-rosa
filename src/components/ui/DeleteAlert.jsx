import React from "react";

const DeleteAlert = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-y-scroll">
      <div className="w-full max-w-4xl mx-10">
        <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 md:mt-10 border ">
          <h1 className="font-bold text-xl text-center mb-2">
            ¿Esta Seguro(a) que quieres eliminar la consulta del paciente?
          </h1>
          <div className="flex justify-around">
            <div>
              <button className="bg-green-600 rounded-md w-32 h-12 shadow-md hover:bg-green-500 transition ease-in text-white font-bold">
                Si, Eliminar
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  props.setDeletePopUp(false);
                  console.log("aloha");
                }}
                className="bg-red-600 rounded-md w-32 h-12 shadow-md hover:bg-red-400 transition ease-in text-white font-bold "
              >
                No, Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
