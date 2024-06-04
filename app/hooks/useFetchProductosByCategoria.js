"use client";

import { useEffect } from "react";
import { useState } from "react";

import { UrlWeb } from "../libs/UrlWeb";

export const useFetchProductosByCategoria = (params) => {
  const [productos, setProductos] = useState([]);
  const [productosfiltered, setProductosfiltered] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const loadproduct = async () => {
      try {
        setIsloading(true);
        const res = await fetch(`${UrlWeb}/productos/categoria/${params}`, {
          cache: "no-cache",
        });

        console.log(res);
        if (res.ok) {
          const data = await res.json();
          console.log(data);

          setProductos(data);
          setProductosfiltered(data);
          setIsloading(false);
        } else {
          return [];
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadproduct();
  }, [params]);

  return {
    productos,
    productosfiltered,
    isloading,
    setProductosfiltered,
  };
};
/*   const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })
    );
   

 setProductos(res); 
  router.refresh(); 
  };  */
