import React, { useState } from "react";
import Logo from "../../assets/glasses.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { DropDown } from "./DropDown";

const NavBar = () => {
  let [open, setOpen] = useState(false);

  let links = [
    { name: "Pacientes", path: "/pacientes" },
    { name: "Paciente+", path: "/informacion_paciente" },
    { name: "Consultas", path: "/lista_consultas" },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold flex items-center font-mono
    text-black"
        >
          <img className="h-16 w-16" src={Logo} />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <span className=" text-[#7f00ff]">
            <FontAwesomeIcon className="mt-4" icon={open ? faXmark : faBars} />
          </span>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 shadow-md md:shadow-none" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-lg md:my-0 my-5 font-mono"
            >
              <NavLink
                className={({ isActive }) =>
                  `group font-mono transition duration-300 cursor-pointer ${
                    isActive ? "text-black font-semibold" : "text-[#969696]"
                  }`
                }
                to={link.path}
              >
                {link.name}
                <span
                  className={`${
                    open
                      ? ""
                      : "block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-600 "
                  }`}
                ></span>
              </NavLink>
            </li>
          ))}
          <DropDown />
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
