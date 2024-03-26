"use client";

import React from "react";

import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";

import Spinner from "@/app/components/Spinner";
import styles from "./filtros.module.css";

const FiltrosProductos = ({
  categorias,
  terminobusqueda,
  loading,

  handlerChange,
  handlerSearch,

  filtrarPorCategoria,
  descargarPDF,
  EnviarInventario,
}) => {
  return (
    <nav className={styles.filtrosContainer}>
      <input
        type="text"
        onChange={handlerSearch}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500 col-span-2"
        placeholder="Buscar...."
        value={terminobusqueda}
      />{" "}
      <div className="bg-slate-300 p-2">
        {categorias.map((item) => {
          return (
            <div key={item._id} className=" ">
              <label>
                <input
                  onChange={handlerChange}
                  type="checkbox"
                  name=""
                  id=""
                  value={item.nombre}
                  className="mr-2 cursor-pointer"
                />
                {item.nombre}
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={filtrarPorCategoria}
          className="w-[100px] h-max flex gap-2 justify-center items-center bg-green-700 px-4  py-2 text-slate-50 rounded-md hover:bg-green-900 "
        >
          Filtrar
        </button>

        <button
          onClick={descargarPDF}
          className="w-[100px] h-max flex gap-2 justify-center items-center bg-red-700 px-6  py-2 text-slate-50 rounded-md hover:bg-red-900 "
        >
          <GrDocumentPdf />
        </button>
        <button
          disabled={loading}
          onClick={EnviarInventario}
          className="w-[100px] h-max flex justify-center items-center bg-sky-700 px-4  py-2 text-slate-50 rounded-md hover:bg-sky-900 "
        >
          {loading ? <Spinner /> : "Enviar"}
        </button>
      </div>
    </nav>
  );
};

export default FiltrosProductos;
