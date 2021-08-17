import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/GeneralComponents/leftpanel.module.scss";

function LeftPanel({ openLeftPanel, setOpenLeftPanel }) {
  let router = useRouter();
  return (
    <AnimatePresence>
      {openLeftPanel && (
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{ type: "Tween", duration: 0.2 }}
          key="leftPanel"
          className={styles.leftPanel}
        >
          <div className={styles.leftPanelContent}>
            <p
              className={`${styles.tab} ${
                router.pathname === "/" ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/")}
            >
              HOME
            </p>
            <p
              className={`${styles.tab} ${
                router.pathname === "/blog" ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/blog")}
            >
              BLOG
            </p>
            <p
              className={`${styles.tab} ${
                router.pathname.indexOf("/quiz") !== -1 ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/quiz/main")}
            >
              QUIZ
            </p>
            <p
              className={`${styles.tab} ${
                router.pathname.indexOf("/calculators") !== -1
                  ? styles.activeTab
                  : ""
              }`}
              onClick={() => router.push("/calculators/main")}
            >
              CALCULATORS
            </p>
            {/* <p
              className={`${styles.tab} ${
                router.pathname === "/contact" ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/community")}
            >
              COMMUNITY
            </p> */}
            <p
              className={`${styles.tab} ${
                router.pathname === "/contact" ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/help")}
            >
              HELP
            </p>
            <p
              className={`${styles.tab} ${
                router.pathname === "/contact" ? styles.activeTab : ""
              }`}
              onClick={() => router.push("/contact")}
            >
              CONTACT US
            </p>
            <div
              className={styles.cancelButton}
              onClick={() => {
                setOpenLeftPanel(false);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="rgb(209, 68, 67)"
                width="40px"
                height="40px"
              >
                <path
                  fill-rule="evenodd"
                  d="M17.999 4l-6.293 6.293L5.413 4 4 5.414l6.292 6.293L4 18l1.413 1.414 6.293-6.292 6.293 6.292L19.414 18l-6.294-6.293 6.294-6.293z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className={styles.background}
            onClick={() => {
              setOpenLeftPanel(false);
            }}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LeftPanel;
