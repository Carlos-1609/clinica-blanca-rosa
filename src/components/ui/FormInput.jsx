import React from "react";

export default function FormInput(props) {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 md:mt-2"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className={`appearance-none  shadow block w-full ${
          !props.disabled ? "bg-white" : "bg-gray-200"
        } text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:shadow-outline focus:border-[#7f00ff]`}
        name={props.name}
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
}
