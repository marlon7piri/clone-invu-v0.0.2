"use client";

import React, { useEffect } from "react";
import BotonDelete from "./BotonDelete";

const TablaMermas = ({ mermas }) => {
  return (
    <div className="w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full  m-auto text-sm text-left text-gray-500 dark:text-gray-400 mt-24 ">
        <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer">
              Producto
            </th>

            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Servicio
            </th>
            <th scope="col" className="px-6 py-3">
              Cantidad
            </th>
            <th scope="col" className="px-6 py-3">
              Causa
            </th>

            <th scope="col" className="px-6 py-3">
              Observaciones
            </th>
            <th scope="col" className="px-6 py-3">
              Accion
            </th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {!mermas ? (
            <h1 className="w-full text-center text-2xl text-slate-900">
              No hay mermas{" "}
            </h1>
          ) : (
            mermas?.map((product) => {
              return (
                <tr
                  className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={product._id}
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-slate-50">
                    {product.producto}
                  </td>

                  <td className="px-6 py-4">{product.fecha}</td>

                  <td className="px-6 py-4 ">{product.servicio}</td>
                  <td className="px-6 py-4 ">{product.cantidad}</td>
                  <td className="px-6 py-4">{product.causa}</td>
                  <td className="px-6 py-4">{product.observaciones}</td>

                  <td className="w-max px-2 py-2  flex gap-1 justify-center items-center">
                    {/* <BotonDelete
                      id={product._id}
                      setMermas={setMermas}
                      mermas={mermas}
                    /> */}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMermas;
