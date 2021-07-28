import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Toast from "../Toast";
import ChoreCategorySelection from "./ChoreCategorySelection";
import ChoreTemplateSelection from "./ChoreTemplateSelection";
import styles from "../../styles/Chores/choremodal.module.scss";

function ChoreModal({ showmodal, setshowmodal }) {
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
    <div className={styles.choreModal}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showmodal ? (
          <div className={styles.choreModalWrapper}>
            <div
              className={styles.background}
              onClick={() => setshowmodal(false)}
            ></div>
            <div className={styles.choreModalcontainer}>
              {mode === "category" ? (
                <ChoreCategorySelection
                  category={category}
                  setcategory={setcategory}
                  setmode={setmode}
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
