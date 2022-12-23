import { useState } from "react";
import { Switch } from "@headlessui/react";
function Switcher() {
  // const [toggle, setToggle] = useState(true);
  // const toggleClass = " transform translate-x-5";
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <div>aloha</div>
    </div>
  );
  // <>
  //   <div className="flex flex-col justify-center items-center ">
  //     <div
  //       className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-purple-300 rounded-full p-1 cursor-pointer"
  //       onClick={() => {
  //         setToggle(!toggle);
  //       }}
  //     >
  //       {/* Switch */}
  //       <div
  //         className={
  //           " bg-[#7f00ff] md:w-6 md:h-6 h-5 w-5 rounded-full  transform duration-300 ease-in-out" +
  //           (toggle ? null : toggleClass)
  //         }
  //       ></div>
  //     </div>
  //     <div className="font-bold ">
  //       {toggle ? "Buscar por nombre" : "Buscar por fecha"}
  //     </div>
  //   </div>
  // </>
}

export default Switcher;
