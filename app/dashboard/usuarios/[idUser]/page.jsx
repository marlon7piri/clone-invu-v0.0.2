"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";

const schema = yup
  .object({
    username: yup.string().max(50).required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().positive().required(),
  })
  .required();

const EditarUsuario = ({ params }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getUnSoloUsuario = async () => {
      try {
        const res = await fetch(`${UrlWeb}/usuarios/${params.idUser}`);
        const usuario = await res.json();


        console.log(usuario)
        reset(usuario);
      } catch (error) {
        console.log(error);
      }
    };
    getUnSoloUsuario();
  }, []);
  const enviarData = async (data) => {
    try {
      const res = await fetch(`${UrlWeb}/usuarios/${params.idUser}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });


      if (!res.ok) {
        toast.error("Error");
      } else {
        toast.success("Usuario editado");
        router.push("/dashboard/usuarios");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-2/4 gap-4"
    >
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Nombre" />}
      />
      {errors.name && (
        <span className="text-red-500">
          {" "}
          El nombre del usuario es requerido y tiene que ser maximo 20
          caracteres
        </span>
      )}
      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="password"
      />
  
      {errors.password && (
        <span className="text-red-500"> La contraseña es requerida</span>
      )}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Email" />}
      />
      {errors.email && <span className="text-red-500"> Correo no valido</span>}

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Phone" />}
      />
      {errors.phone && (
        <span className="text-red-500"> Solo son numeros del 0 al 9</span>
      )}
      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Address" />}
      />
      {errors.address && (
        <span className="text-red-500"> La direccion es requerida</span>
      )}

      <div className="flex gap-4 justify-center items-center">
        <div>
          isAdmin{" "}
          <Controller
            name="isAdmin"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <input {...field} type="radio" value={true} />
            )}
          />
        </div>
        <div>
          noAdmin{" "}
          <Controller
            name="isAdmin"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <input {...field} type="radio" value={false} />
            )}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div>
          Activo{" "}
          <Controller
            name="isActive"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <input {...field} type="radio" value={true} />
            )}
          />
        </div>
        <div>
          Inactivo{" "}
          <Controller
            name="isActive"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <input {...field} type="radio" value={false} />
            )}
          />
        </div>
      </div>
      <input
        type="submit"
        value={isLoading ? "Editar" : "Crear"}
        className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
      />
    </form>
  );
};

export default EditarUsuario;
