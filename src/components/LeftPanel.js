import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/GeneralComponents/leftpanel.module.scss";
import RemoveSvg from "./SVGcomponents/RemoveSvg";

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
              <RemoveSvg clr="rgb(209, 68, 67)" />
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
