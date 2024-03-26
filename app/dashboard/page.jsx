"use client";
import React, { useEffect } from "react";
import styles from "./section.module.css";
import DashboardTotalProductos from "./DashboardTotalProductos";
import DashboardDineroEnInventario from "./DashboardDineroEnInventario";
import DashboardProductosMasYMenosVendidos from "./DashboardProductosMasYMenosVendidos";
import DashboardProductosCasiAgotados from "./DashboardProductosCasiAgotados";

const Dashboard = () => {
  



  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-800">
        Dashboard
      </h1>

      <section className={styles.section}>
        {" "}
{/*         <DashboardGrafica /> */}

          <DashboardTotalProductos />
          <DashboardDineroEnInventario />
       
        <DashboardProductosMasYMenosVendidos />
        <DashboardProductosCasiAgotados />
      </section>
    </div>
  );
};

export default Dashboard;
