import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/GeneralComponents/leftpanel.module.scss";
import RemoveSvg from "./SVGcomponents/RemoveSvg";
import HeaderTabSection from "./Header/HeaderTabSection";

function LeftPanel({ openLeftPanel, setOpenLeftPanel }) {
  let router = useRouter();
  const [current, setcurrent] = useState("");
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
              current={current}
              setcurrent={setcurrent}
              title={"Products"}
              tabs={[
                {
                  name: "Quests",
                  pushTo: "/products/quest",
                },
                {
                  name: "Games arena",
                  pushTo: "/products/games",
                },
                {
                  name: "Chores",
                  pushTo: "/products/chores",
                },
                { name: "Live workshops", pushTo: "/products/liveclasses" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Games"}
              current={current}
              setcurrent={setcurrent}
              tabs={[]}
              pushTo="/games"
            />
            <HeaderTabSection
              mobile={true}
              title={"Pricing"}
              current={current}
              setcurrent={setcurrent}
              tabs={[]}
              pushTo="/pricing"
            />
            <HeaderTabSection
              mobile={true}
              current={current}
              setcurrent={setcurrent}
              title={"Resources"}
              tabs={[
                { name: "About us", pushTo: "/about-us" },
                { name: "Team", pushTo: "/team" },
                { name: "Blogs", pushTo: "/blogs" },
                { name: "Financial calculators", pushTo: "/calculators" },
                // { name: "Careers", pushTo: "/careers" },
                { name: "FAQs", pushTo: "/help/faq" },
                { name: "Contact us", pushTo: "/contact" },
              ]}
            />

            <HeaderTabSection
              mobile={true}
              title={"Contact Us"}
              current={current}
              setcurrent={setcurrent}
              tabs={[]}
              pushTo="/contact"
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
