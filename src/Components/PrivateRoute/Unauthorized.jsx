import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-[83.7vh] bg-grey-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl my-4 text-slate-800">404 page not found</h1>
      <button
        className="mr-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 focus:border-b-0 rounded"
        onClick={() => navigate("/")}
      >
        go to homepage
      </button>
    </div>
  );
};

export { Unauthorized };
