import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";
import Image from 'next/image'

const DashboardDineroEnInventario = () => {
  const { totalProductos } = useClientContext();

  const conteoDineroTotal = () => {
    const valor = totalProductos.reduce((acc, current) => {
      return (acc += current.precio_por_unidad * current.stock);
    }, 0);

    return  valor ;
  };

  const dinerototal = conteoDineroTotal()
  return (
    <div className={styles.dineroInventario}>
    <Image src='/moneyicon.png' alt="icono de dinero" width={65} height={65} className="object-cover"/><span className="text-2xl font-bold">${dinerototal.toFixed(2)}</span>
    </div>
  );
};

export default DashboardDineroEnInventario;
