import React, { useEffect, useState } from "react";
import { UrlWeb } from "../libs/UrlWeb";

export const useFetchCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasfiltradas, setCategoriasfiltradas] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const res = await fetch(`${UrlWeb}/categorias`);

      const data = await res.json();
      setCategorias(data);
      setCategoriasfiltradas(data);
    };

    obtenerCategorias();
  }, []);
  return { categorias, categoriasfiltradas, setCategoriasfiltradas };
};
