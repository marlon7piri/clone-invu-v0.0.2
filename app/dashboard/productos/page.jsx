import React from "react";
import ListaDeProductos from "./ListaDeProductos";
import NavProductos from "./NavProductos";
import { getProducts } from "@/app/libs/data";

export default async function Productos({ searchParams }) {
  const q = searchParams?.query || "";

  const productos = await getProducts(q);
  

 

  return (
    <div className="flex flex-col gap-4 ">
      <NavProductos productos={productos}/>
      <ListaDeProductos productos={productos} />
    </div>
  );
}
