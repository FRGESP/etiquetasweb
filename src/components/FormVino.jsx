"use client";
import React, { useState } from "react";
import { Search, View } from 'lucide-react';


function FormVino() {

  const [inputValues, setInputValues] = useState({
    nombreVino: "",
  });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 border border-black p-10 rounded-lg shadow-2xl">
      <label className="text-center font-bold text-3xl">Nombre del Vino</label>
      <div className="flex">
          <input
            type="text"
            onChange={handleChange}
            name="nombreVino"
            id="nombreVino"
            className=" py-4 rounded-full text-lg px-2 w-full flex-grow border-2 border-gray-500"
          />
          <button
            onClick={handleSubmit}
            className=" ml-1 rounded-md p-2 hover:bg-gray-200"
          >
            <Search  size={44}/>
          </button>
      </div>

      <div className="border-2 border-gray-500 w-full h-80 rounded-md mt-10">
      </div>

    </div>
  );
}

export default FormVino;
