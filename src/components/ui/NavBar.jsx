import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profileImage from "../../assets/profile.png";

const NavBar = () => {
  let Links = [
    { name: "Pacientes", link: "/" },
    { name: "Paciente", link: "/" },
    { name: "Consultas", link: "/" },
    { name: "About", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-mono
    text-black"
        >
          Designer
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          {/* <FontAwesomeIcon
            icon={open ? "fa-xmark" : "fa-bars"}
            style={{
              color: "linear-gradient(to bottom, #7f00ff 0%, #e100ff 100%)",
            }}
          /> */}
          <span className=" text-[#7f00ff]">
            <FontAwesomeIcon icon={open ? "fa-xmark" : "fa-bars"} />
          </span>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl md:my-0 my-5 font-mono"
            >
              <a className="group font-mono transition duration-300">
                {link.name}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-purple-600"></span>
              </a>
            </li>
          ))}
          <div className="mr-2 lg:ml-8 md:ml-8 flex">
            <img className="h-16 w-16" src={profileImage} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
