import React, { useContext } from "react";
import { Eventcontext } from "../context/Event_State";

const Alert = () => {
  const { message } = useContext(Eventcontext);
  return (
    <div
      className="bg-green-100 z-100 border border-green-400 text-green-700 px-2 bg-opacity-30 py-2 rounded w-full relative top-13"
      role="alert"
    >
      <span className=" w-full  inline-flex">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
};

export default Alert;
