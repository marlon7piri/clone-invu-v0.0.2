"use client";

import React, { useEffect } from "react";

import FiltrosMermas from "./FiltrosMermas";

import { getMermas } from "@/app/libs/actions/mermas/get-mermas";
import TablaMermas from "./TablaMermas";

const Mermas = () => {
  const [mermas, setMermas] = useState([]);

  useEffect(() => {
    const obtenerMermas = async () => {
      try {
        const data = await getMermas();
        const res = await data.json();
        return res;
      } catch (error) {
        throw new Error(error);
      }
    };
    const res = obtenerMermas();
    setMermas(res);
  }, []);

  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <FiltrosMermas mermas={mermas} />
        <TablaMermas mermas={mermas} />
      </div>
    </div>
  );
};

export default Mermas;
