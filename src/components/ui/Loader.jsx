import React from "react";

export const Loader = (props) => {
  if (props.fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
            <div className="h-9 w-9 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
        <div className="h-7 w-7 rounded-full bg-white"></div>
      </div>
    );
  }
};
