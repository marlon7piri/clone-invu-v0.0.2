'use client'

import React from "react";


import { FormNewProducto } from "./FormNewProducto";
import { useFetchCategorias } from "@/app/hooks/useFetchCategorias";

const NewProducto = () => {
 const {categorias} =  useFetchCategorias()


  return <FormNewProducto  categorias={categorias}/>;
};

export default NewProducto;
