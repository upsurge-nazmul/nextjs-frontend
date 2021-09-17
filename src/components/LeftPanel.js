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
              title={"About us"}
              tabs={[
                { name: "Our Northstar", pushTo: "/northstar" },
                { name: "Team", pushTo: "/team" },
                { name: "Life@upsurge", pushTo: "/lifeatupsurge" },
                { name: "Careers", pushTo: "/careers" },
                { name: "FAQ's", pushTo: "/help" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Benefits"}
              tabs={[
                { name: "Financial Literacy", pushTo: "/benefits/finlitracy" },
                {
                  name: "Experiental Learning",
                  pushTo: "/benefits/explearning",
                },
                {
                  name: "Entrepreneurship",
                  pushTo: "/benefits/entrepreneurship",
                },
                { name: "Rewards", pushTo: "/benefits/rewards" },
                { name: "Community", pushTo: "/benefits/community" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Products"}
              tabs={[
                {
                  name: "Knowledge Quest",
                  pushTo: "/products/knowledgequests",
                },
                {
                  name: "Games Arena",
                  pushTo: "/products/games",
                },
                {
                  name: "Jobs",
                  pushTo: "/products/jobs",
                },
                { name: "Family Fun", pushTo: "/products/familyfun" },
                { name: "Tribes", pushTo: "/products/tribes" },
                { name: "Live Classes", pushTo: "/products/liveclasses" },
                { name: "Pricing", pushTo: "/products/pricing" },
              ]}
            />
            <HeaderTabSection
              mobile={true}
              title={"Play"}
              tabs={[
                { name: "Games", pushTo: "/games" },
                {
                  name: "Quizzes",
                  pushTo: "/quiz/main",
                },
              ]}
            />

            <HeaderTabSection
              mobile={true}
              title={"Learn"}
              tabs={[
                { name: "Blogs", pushTo: "/blogs" },
                {
                  name: "Cheat Codes",
                  pushTo: "/cheatcodes",
                },
                { name: "Financial Calculators", pushTo: "/calculators/main" },
                { name: "Goal Wizard", pushTo: "/goalwizard" },
                { name: "Live Classes", pushTo: "/liveclasses" },
                { name: "Tournaments", pushTo: "/tournaments" },
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
