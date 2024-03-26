"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TablaMermas from "./TablaMermas";

const FiltrosMermas = ({ mermas }) => {
  /* const [fecha, setFecha] = useState("");
  const [tablaMermas, settablaMermas] = useState(data);
  const [mermas, setMermas] = useState(data);
  const router = useRouter();

  const filtrar = () => {
    const result = tablaMermas.filter((merma) => {
      return merma.fecha === fecha;
    });
    if (result.length === 0) {
      alert("No hay mermas para este dia");
      setMermas(tablaMermas);
      setFecha("");
    } else {
      setMermas(result);
    }
  };
  const limpiar = () => {
    setMermas(tablaMermas);
  }; */
  return (
    <div>
      <input
        type="date"
       /*  onChange={(e) => setFecha(e.target.value)}
        value={fecha} */
        className="cursor-pointer"
      />
      <button
        type="submit"
       /*  onClick={filtrar} */
        className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm"
      >
        Filtrar
      </button>
      <button
        type="submit"
      /*   onClick={limpiar} */
        className="w-max ml-4 bg-sky-500  hover:bg-sky-900 px-4 py-2 rounded-sm"
      >
        Limpiar
      </button>

     {/*  <TablaMermas mermas={mermas}/> */}
    </div>
  );
};

export default FiltrosMermas;
