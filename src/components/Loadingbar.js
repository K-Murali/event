import React from "react";
import { useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import LoadingBar from "react-top-loading-bar";

const Loader = () => {
  const { loadval, setloadval } = useContext(Eventcontext);
  return (
    <LoadingBar
      color="#f11946"
      progress={loadval}
      onLoaderFinished={() => setloadval(0)}
    />
  );
};

export default Loader;
