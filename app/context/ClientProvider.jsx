"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";

import { SessionProvider } from "next-auth/react";
import  { createContext, useContext, useState, useEffect } from "react";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState([]);

  const [mermas, setMermas] = useState([]);
  const [tablademermas, setTablademermas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [dinerototal, setDinerototal] = useState(0);
  const [avisodecorreo, setAvisodecorreo] = useState(false);

   const getProductoPorCategoria = async (categoria) => {
    try {
      setLoading(true);
      const res = await fetch(`${UrlWeb}/productos/categoria/${categoria}`);
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
        setTablaProductos(data);
        setLoading(false);

        return data;
      } else {
        console.log(res);
      }
    } catch (error) {}
  };

  useEffect(() => {
    try {
      const obtenerTodosLosProductos = async () => {
        const res = await fetch(`${UrlWeb}/productos`, { cache: "no-cache" });
        const data = await res.json();
        setTotalProductos(data);
        conteoDineroTotal(data);
      };
      obtenerTodosLosProductos();
    } catch (error) {
      throw new Error(error)
    }
  }, []);

  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
    );

    setProductos(res);
    /*  router.refresh(); */
  };

  const conteoDineroTotal = (array) => {
    const valor = array.reduce((acc, current) => {
      return (acc += current.precio_por_unidad * current.stock);
    }, 0);

    setDinerototal(valor);
  };
  return (
    <SessionProvider>
      <ClientContext.Provider
        value={{
          pedidos,
          setPedidos,
          ordenarPorNombre,
          setProductos,
          setTablaProductos,
          productos,
          loading,
          setLoading,
          setTotalProductos,
          totalProductos,
          tablaProductos,
          getProductoPorCategoria,
          mermas,
          setMermas,
          setTablademermas,
          tablademermas,
          dinerototal,
          avisodecorreo,
          setAvisodecorreo,
          orden,
          setOrden,
        }}
      >
        {children}
      </ClientContext.Provider>
    </SessionProvider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
