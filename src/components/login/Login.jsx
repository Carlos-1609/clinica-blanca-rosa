import React from "react";
import ImageForm from "../../assets/registration-form.png";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center bg-gradient-to-r from-[#D7E1EC] to-[#FFFFFF] h-screen items-center space-y-9">
      <div className="space-y-9 rounded-lg h-100 bg-white shadow-lg flex flex-col justify-center items-center p-10">
        <div className="h-36 w-36">
          <img src={ImageForm}></img>
        </div>

        <div>
          <h1 className="font-mono text-5xl">Bienvenido</h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/pacientes")}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 shadow-md"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Iniciar Sesion Con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
