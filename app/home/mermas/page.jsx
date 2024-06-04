"use client";

import React from "react";
import FormMermas from "./FormMermas";

import { useFetchProducts } from "@/app/hooks/useFetchProducts";

export default function Mermas() {
  const {
    productos,

    productosfiltered,
    isloading,
    setProductosfiltered,
  } = useFetchProducts();

  return (
    <div className="w-full h-screen flex flex-col justify-center p-4 overflow-scroll">
      <FormMermas
        productos={productos}
        productosfiltered={productosfiltered}
        setProductosfiltered={setProductosfiltered}
      />
    </div>
  );
}
