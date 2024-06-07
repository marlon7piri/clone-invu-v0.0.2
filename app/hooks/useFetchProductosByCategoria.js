"use client";

import { useEffect } from "react";
import { useState } from "react";

import { UrlWeb } from "../libs/UrlWeb";
import { useSession } from "next-auth/react";

export const useFetchProductosByCategoria = (params) => {
  const [productos, setProductos] = useState([]);
  const [productosfiltered, setProductosfiltered] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const { data: session } = useSession();

  console.log("session", session);

  useEffect(() => {
    const loadproduct = async () => {
      try {
        setIsloading(true);
        const res = await fetch(
          `${UrlWeb}/productos/categoria/${params}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "appliication/json",
            },

            body: JSON.stringify(session.restaurante_id),
          },
          {
            cache: "no-cache",
          }
        );

        if (res.ok) {
          const data = await res.json();

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
    filtrarPorCategoria();
  }, [params]);

  const filtrarPorCategoria = () => {
    const result = productos.filter((product) => {
      return categoriasSeleccionadas.includes(product.categoria.nombre);
    });

    setProductosfiltered(result);
  };

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
