import React, { useEffect, useState } from "react";
import styles from "../styles/GeneralComponents/loading.module.scss";
import Logo from "../components/SVGcomponents/Logo";
export default function Loading() {
  const [loadingdot, setloadingdot] = useState(0);
  const [trail, settrail] = useState("");
  useEffect(() => {
    let x = setInterval(() => setloadingdot((prev) => (prev + 1) % 5), 500);
    return () => clearInterval(x);
  }, []);

  useEffect(() => {
    let s = "";
    for (let i = 0; i < loadingdot; i++) {
      s = s + ".";
    }
    console.log(trail);
    settrail(s);
  }, [loadingdot]);

  return (
    <div className={styles.loading}>
      <Logo className={styles.logo} />
      <p className={styles.text}>Loading {trail}</p>
    </div>
  );
}
