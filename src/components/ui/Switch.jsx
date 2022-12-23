import { useState } from "react";

function Switch() {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-purple-300 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {/* Switch */}
          <div
            className={
              "bg-[#7f00ff] md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
        <div className="font-bold ">
          {toggle ? "Buscar por nombre" : "Buscar por fecha"}
        </div>
      </div>
    </>
  );
}

export default Switch;
