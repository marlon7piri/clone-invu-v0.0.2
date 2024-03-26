'use client'

import React /* useEffect, useState  */ from "react";
import Areas from "./Areas";
import styles from "./home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter()

  /* if (!session) {
    router.push("/login");
  } */

  return (
    <div className={styles.home_section}>
      <Areas />
    </div>
  );
};

export default Home;
