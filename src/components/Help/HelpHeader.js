import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Help/header.module.scss";
import LeftPanel from "../LeftPanel";
import HamSvg from "../SVGcomponents/HamSvg";
import Logo from "../SVGcomponents/Logo";

function Header({ setOpenLeftPanel }) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.hamburger}
          onClick={() => {
            setOpenLeftPanel(true);
          }}
        >
          <HamSvg />
        </div>
        <div className={styles.logoContainer}>
          <Logo onClick={() => router.push("/")} className={styles.logo} />
        </div>
        <div className={styles.nav}>
          <p
            className={` ${
              router.pathname === "/help" ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/help")}
          >
            Help & Support
          </p>
          <p
            className={` ${
              router.pathname === "/community" ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/community")}
          >
            Community Home
          </p>
        </div>
        <div className={styles.signin} onClick={() => router.push("/")}>
          Back to upsurge
        </div>
      </div>
    </div>
  );
}

export default Header;
