"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";

const schema = yup
  .object({
    nombre: yup.string().max(50).required(),

    stock: yup.number().required().min(0),
    stock_min: yup.number().positive().required(),
  })
  .required();

const EditarProducto = ({ params }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const actualizarData = async (data) => {
    const res = await fetch(`${UrlWeb}/productos/${params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(res)

    if (!res.ok) {
      toast.error("Error");
    } else {
      toast.success("Producto editado");

      router.back();
      router.refresh();
    }
  };

  useEffect(() => {
    try {
      const getOnlyProducto = async () => {
        /* const data = await getOnlyAProducto(
          params.id
        ); */ const res = await fetch(`${UrlWeb}/productos/${params.id}`);
        const data = await res.json();

        reset(data);
      };

      getOnlyProducto();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(actualizarData)}
        className="flex flex-col m-auto p-4 w-2/4  gap-4"
      >
        <input
          type="text"
          {...register("nombre", { required: true })}
          placeholder="nombre"
          disabled
        />

        <Controller
          name="stock"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} placeholder="Cantidad" />}
        />
        {errors.stock && (
          <span className="text-red-500">
            {" "}
            Solo son numeros enteros y con decimales{" "}
          </span>
        )}

        <input
          disabled={isLoading}
          type="submit"
          value={isLoading ? "loading..." : "Editar"}
          className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default EditarProducto;
