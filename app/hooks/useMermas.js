"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { useClientContext } from "@/app/context/ClientProvider";
import { YupSchemaMermas } from "@/yup.config";
import { useState } from "react";
import { useEffect } from "react";

export const useMermas = (productos) => {
  console.log(productos);
  const router = useRouter();
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  /* const { totalProductos, setTotalProductos } = useClientContext(); */
  const [idproduct, setIdproduct] = useState("");
  const [productoexist, setProductoexist] = useState();
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(YupSchemaMermas),
  });
  const enviarData = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${UrlWeb}/mermas`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, idproduct }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
        setLoading(false);
      } else {
        setLoading(false);

        toast.success("Merma creada");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
    setBusqueda("");
  };

  // Capturar lo que el usuario escribe en el input y guardarlo en un estado
  const handlerChange = (e) => {
    setBusqueda(e.target.value);
    filtrar();
  };

  //filtrar los productos y que me devuelva una lista con los nombres que cocincidan con la busqueda
  const filtrar = () => {
    const productosFounded = productos.filter((item) => {
      if (
        item.nombre.toString().toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return item;
      }
    });
    setProductoexist(productosFounded);
  };

  //hacer la peticion al servidor y me devuelva el producto seleccionado y renderizarlo en el input

  const handlerSelect = async (itemselected) => {
    const res = await fetch(`${UrlWeb}/productos/${itemselected._id}`);
    const result = await res.json();
    setBusqueda(result.nombre);
    setIdproduct(result._id);

    setProductoexist([]);
  };

  return {
    busqueda,

    productoexist,
    /* totalProductos, */
    register,
    isLoading,
    errors,
    enviarData,
    handlerSelect,
    handlerChange,
  };
};
