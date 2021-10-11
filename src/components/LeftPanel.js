import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/GeneralComponents/leftpanel.module.scss";
import RemoveSvg from "./SVGcomponents/RemoveSvg";
import HeaderTabSection from "./Header/HeaderTabSection";

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
            <HeaderTabSection
              mobile={true}
              title={"Products"}
              tabs={[
                {
                  name: "Knowledge Quest",
                  pushTo: "/products/quest",
                },
                {
                  name: "Games Arena",
                  pushTo: "/products/games",
                },
                {
                  name: "Chores",
                  pushTo: "/products/chores",
                },
                { name: "Live Classes", pushTo: "/products/liveclasses" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Benefits"}
              tabs={[
                { name: "Financial", pushTo: "/benefits" },
                { name: "Experimential", pushTo: "/benefits/experimential" },
                {
                  name: "Entrepreneuership",
                  pushTo: "/benefits/entrepreneuership",
                },
                { name: "Rewards", pushTo: "/benefits/rewards" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Games"}
              tabs={[]}
              pushTo="/gamepage"
            />
            <HeaderTabSection
              mobile={true}
              title={"Quizzes"}
              tabs={[]}
              pushTo="/quiz/main"
            />
            <HeaderTabSection
              mobile={true}
              title={"More"}
              tabs={[
                { name: "About us", pushTo: "/about" },
                { name: "Blogs", pushTo: "/blogs" },
                { name: "Financial Calculators", pushTo: "/calculators" },
                { name: "FAQ's", pushTo: "/help/faq" },
                { name: "Contact us", pushTo: "/contact" },
              ]}
            />

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
