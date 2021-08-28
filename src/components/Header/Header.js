import React, { useState } from "react";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";
import Logo from "../SVGcomponents/Logo";
import HamSvg from "../SVGcomponents/HamSvg";

function Header({
  setOpenLeftPanel,
  showauth,
  setshowauth,
  authmode,
  mailfromhome,
}) {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <AuthPage
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
      />
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
          <Logo onClick={() => router.push("/")} className="logo" />
        </div>
        <div className={styles.nav}>
          <p
            className={` ${router.pathname === "/" ? styles.activeTab : ""}`}
            onClick={() => router.push("/")}
          >
            Home
          </p>
          <p
            className={` ${
              router.pathname === "/blog" ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/blog")}
          >
            Blog
          </p>
          <p
            className={` ${
              router.pathname.indexOf("/quiz") !== -1 ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/quiz/main")}
          >
            Quiz
          </p>
          <p
            className={` ${
              router.pathname.indexOf("/gamepage") !== -1
                ? styles.activeTab
                : ""
            }`}
            onClick={() => router.push("/gamepage")}
          >
            Games
          </p>
          <p
            className={`${
              router.pathname.indexOf("/calculators") !== -1
                ? styles.activeTab
                : ""
            }`}
            onClick={() => router.push("/calculators/main")}
          >
            Calculators
          </p>
          <p
            className={` ${
              router.pathname === "/help" ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/help")}
          >
            Help
          </p>
          <p
            className={`${
              router.pathname === "/contact" ? styles.activeTab : ""
            }`}
            onClick={() => router.push("/contact")}
          >
            Contact us
          </p>
        </div>
        <div className={styles.signin} onClick={() => setshowauth(true)}>
          Signin
        </div>
      </div>
    </div>
  );
}

export default Header;
