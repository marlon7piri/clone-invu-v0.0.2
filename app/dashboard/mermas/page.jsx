"use client";

import React, { useEffect, useState } from "react";

import FiltrosMermas from "./FiltrosMermas";

import TablaMermas from "./TablaMermas";
import { UrlWeb } from "@/app/libs/UrlWeb";

const Mermas = () => {
  const [mermas, setMermas] = useState([]);

  useEffect(() => {
    const loadMerma = async () => {
      const res = await fetch(`${UrlWeb}/mermas`);
      const data = await res.json();
      setMermas(data);
    };
    loadMerma();
  }, []);

  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <FiltrosMermas mermas={mermas} setMermas={setMermas} />
        <TablaMermas mermas={mermas} />
      </div>
    </div>
  );
};

export default Mermas;
