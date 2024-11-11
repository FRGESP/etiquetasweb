"use client";
import React, { useState } from "react";
import { Search  } from 'lucide-react';
import axios from "axios";
import ButtonSelect from "@/components/buttonSelect";


function FormVino() {

    //Para guardar los vinos
    const [vinos, setVinos] = useState([]);
    //Por si no hay resiltados
    const [Results, setResults] = useState(false);
    // Para verificar si es la primera carga
    const [firstLoad, setFirstLoad] = useState(true);

  const [inputValues, setInputValues] = useState({
    nombreVino: "",
  });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const response = await axios.post("/api/Vinos",{Vino: inputValues.nombreVino});
    if(response.data.length === 0){
        setResults(false);
        return;
    }
    console.log(response.data);
    setVinos(response.data);
    setResults(true);
    setFirstLoad(false);
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

      <div className="border-2 border-gray-500 w-full h-96 rounded-md mt-10 overflow-y-auto">
        {Results && (
          <table>
            <thead>
              <tr className="sticky top-0">
                  <th>Vino</th>
                  <th>Viñedo</th>
                  <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {vinos.map((vino) => (
                <tr key={vino.ID}>
                  <td>{vino.Vino}</td>
                  <td>{vino.Vinedo}</td>
                  <td className="flex justify-center items-center">
                    <ButtonSelect IdVino={vino.ID} Nombre={vino.Vino}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!Results && (
          <div className="flex justify-center items-center h-full">
            <h1>{firstLoad ? "Inserte el nombre de un vino en la barra de búsqueda para descragar su QR" : "No hay resultados con ese nombre"}</h1>
          </div>
        )}
      </div>

    </div>
  );
}

export default FormVino;
