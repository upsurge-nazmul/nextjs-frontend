import { useRouter } from "next/dist/client/router";
import React from "react";
import Logo from "../../assets/logo.svg";
import styles from "../../styles/Help/header.module.scss";

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
            className={styles.logo}
            alt=""
          />
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
          Back to Upsurge
        </div>
      </div>
    </div>
  );
}

export default Header;
