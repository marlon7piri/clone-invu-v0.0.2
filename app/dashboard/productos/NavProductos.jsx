'use client'

import Boton from "@/app/components/Boton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {useDebouncedCallback} from 'use-debounce'
import React from "react";
import Input from "@/app/components/Input";
import BotonEXCEL from "@/app/components/BotonEXCEL";
import BotonPDF from "@/app/components/BotonPDF";

const NavProductos = ({productos}) => {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchparams);

    if (e.target.value) {
      params.set("query", e.target.value);

    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params}`);
  }, 300);
  return (
    <nav className="flex justify-between bg-slate-50 shadow-2xl p-4 rounded-md mt-8">
     <Input   onChange ={handlerSearch} placeholder='Buscar..'/> 
    
    <div className="flex gap-4">
    {/* <BotonEXCEL productos={productos}/> */}
    <BotonPDF productos={productos}/>
    </div>
      <Boton texto="Nuevo" href="/dashboard/productos/new" />
    </nav>
  );
};

export default NavProductos;
