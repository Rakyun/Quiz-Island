import React from "react";
import islandsLogo from "../assets/ids_logo.svg";
const Menu = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img className="w-[45%] max-w-[500px] mb-10" src={islandsLogo} alt="" />
      <button
        onClick={props.createSession}
        className="cursor-pointer select-none p-4 text-3xl w-[70%] hover:bg-red-400 bg-red-600 rounded-xl font-bold text-white transition duration-300 hover:scale-105"
      >
        Start Game
      </button>
    </div>
  );
};

export default Menu;
