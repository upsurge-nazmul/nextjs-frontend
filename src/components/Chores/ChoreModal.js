import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Toast from "../Toast";
import ChoreCategorySelection from "./ChoreCategorySelection";
import ChoreTemplateSelection from "./ChoreTemplateSelection";
import styles from "../../styles/Chores/choremodal.module.scss";

function ChoreModal({
  showmodal,
  setshowmodal,
  id,
  tourActive,
  setStoryIndex,
}) {
  //modes will be start , category , template, assign
  const [userdata, setuserdata] = useState(null);
  const [mode, setmode] = useState("category");
  const [category, setcategory] = useState("");

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  return (
    <div className={styles.choreModal} style={tourActive ? { zIndex: 22 } : {}}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showmodal ? (
          <div className={styles.choreModalWrapper}>
            {!tourActive && (
              <div
                className={styles.background}
                onClick={() => setshowmodal(false)}
              ></div>
            )}
            <div className={styles.choreModalcontainer} id={id}>
              {mode === "category" ? (
                <ChoreCategorySelection
                  tourActive={tourActive}
                  category={category}
                  setcategory={setcategory}
                  setmode={setmode}
                  setshowmodal={setshowmodal}
                  setStoryIndex={setStoryIndex}
                />
              ) : mode === "template" ? (
                <ChoreTemplateSelection category={category} setmode={setmode} />
              ) : null}
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ChoreModal;
