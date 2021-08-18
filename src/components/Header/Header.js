import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/logo.svg";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";

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
          <svg
            viewBox="0 0 24 24"
            fill="rgb(209, 68, 67)"
            width="40px"
            height="40px"
            data-ux="IconHamburger"
          >
            <g>
              <path fillRule="evenodd" d="M4 8h16V6H4z"></path>
              <path fillRule="evenodd" d="M4 13.096h16v-2.001H4z"></path>
              <path fillRule="evenodd" d="M4 18.346h16v-2H4z"></path>
            </g>
          </svg>
        </div>
        <div className={styles.logoContainer}>
          <img
            src={Logo.src}
            onClick={() => router.push("/")}
            className="logo"
          />
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
            className={`${router.pathname === "/help" ? styles.activeTab : ""}`}
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
