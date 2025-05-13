import React from "react";

const Modal = (props) => {
  return (
    <div className="fixed inset-x-[25%] inset-y-[20%] p-10 flex flex-col items-center justify-center bg-gray-700 rounded-lg shadow-lg">
      <p className="text-white text-2xl mb-10">Your Answer is</p>
      <p
        className={` text-4xl mb-10 ${
          props.results.isCorrect ? "text-green-500" : "text-red-500"
        }`}
      >
        {props.results.isCorrect ? "Correct" : "Wrong"}
      </p>
      <button
        onClick={props.onNext}
        className="cursor-pointer select-none bg-white px-2 py-3 w-[80%] rounded-lg shadow-lg text-xl font-bold text-center transition duration-300 hover:bg-gray-300 hover:scale-105"
      >
        Next
      </button>
    </div>
  );
};

export default Modal;
