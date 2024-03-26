"use client";

import React, { useState } from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";
import { useFetchProductosByCategoria } from "@/app/hooks/useFetchProductosByCategoria";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { jsPDF } from "jspdf";
import { useFetchCategorias } from "@/app/hooks/useFetchCategorias";
import { UrlWeb } from "@/app/libs/UrlWeb";
import toast from "react-hot-toast";

const Categoria = ({ params }) => {
  const { productos, isloading, productosfiltered, setProductosfiltered } =
    useFetchProductosByCategoria(params.categoria);

  const { categorias, categoriasfiltradas, setCategoriasfiltradas } =
    useFetchCategorias();

  const [terminobusqueda, setTerminobusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    mayor_cantidad: "",
    menor_cantidad: "",
    categoria: "",
    area: "",
    masvendidos: false,
  });
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  const { data: session } = useSession();
  const [masvendidos, setMasvendidos] = useState("");
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState("");

  const handlerSearch = (e) => {
    setTerminobusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (busqueda) => {
    const result = productos.filter((item) => {
      if (
        item.nombre.toString().toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return item;
      }
    });
    setProductosfiltered(result);
  };

  const filtrarPorCantidades = (value) => {
    if (value === "mayor") {
      let result = productos.sort((a, b) => {
        return b.stock - a.stock;
      });
      setProductosfiltered(result);
    } else {
      let result = productos.sort((a, b) => {
        return a.stock - b.stock;
      });
      setProductosfiltered(result);
    }
    /* router.refresh(); */
  };

  const descargarPDF = () => {
    const fecha2 = new Date().toLocaleString().substring(0, 10);
    const fecha =
      fecha2.toString(); /* .substring(0,10) */ /* .reverse().split("-").join("") */

    const jspdf = new jsPDF();
    jspdf.text(
      `Inventario del Dia ${fecha}, tutor ${session.username}`,
      30,
      10
    );

    const column = ["Producto", "Stock", "Unidad", "Proveedor"];
    const body = productos.map((e) => {
      return [e.nombre, e.stock, e.unidad, e.proveedor];
    });

    jspdf.autoTable({
      startY: 30,
      head: [column],
      body: body,
    });
    setAvisodecorreo(!avisodecorreo);
    jspdf.save(`Inventario_Semanal-${fecha}.pdf`);
  };

  const EnviarInventario = async () => {
    let fechaActual = new Date();

    // Obtiene los componentes de la fecha (día, mes y año)
    let dia = fechaActual.getDate().toString().padStart(2, "0");
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0, por lo que se suma 1
    let año = fechaActual.getFullYear();

    // Formatea la fecha en el formato deseado (puedes ajustar el formato según tus preferencias)
    let fechaFormateada = año + "-" + mes + "-" + dia;
    // Devuelve la fecha formateada

    let area = params.categoria;
    setLoading(true);
    const res = await fetch(`${UrlWeb}/inventario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ fecha: fechaFormateada, productosfiltered, area }),
    });

    if (!res.ok) {
      const result = await res.json();

      toast.error(result.error);
    } else {
      toast.success("Inventario enviado");
      const result = await res.json();
    }
    setLoading(false);
  };

  const handlerSelectTipoInventario = (e) => {
    setMasvendidos(e);
    console.log(masvendidos);
    filtrarTipoInventario();
  };

  const filtrarTipoInventario = (e) => {
    const res = productos.filter((item) => {
      return e.target.value === "mas" ? item.mas_vendido : item;
    });

    setProductosfiltered(res);
  };

  const handlerChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, value]);
    } else {
      setCategoriasSeleccionadas(
        categoriasSeleccionadas.filter((cat) => cat !== value)
      );
    }
  };

  const filtrarPorCategoria = () => {
    const result = productos.filter((product) =>
      categoriasSeleccionadas.includes(product.categoria.nombre)
    );
    setProductosfiltered(result);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">
      <FiltrosProductos
        productos={productos}
        categorias={categorias}
        setProductosfiltered={setProductosfiltered}
        terminobusqueda={terminobusqueda}
        loading={loading}
        cantidad={cantidad}
        setCantidad={setCantidad}
        handlerSearch={handlerSearch}
        filtrarTipoInventario={filtrarTipoInventario}
        filtrarPorCantidades={filtrarPorCantidades}
        handlerChange={handlerChange}
        filtrarPorCategoria={filtrarPorCategoria}
        descargarPDF={descargarPDF}
        EnviarInventario={EnviarInventario}
      />
      <TablaProductos
        productosfiltered={productosfiltered}
        isloading={isloading}
      />
    </div>
  );
};

export default Categoria;
