import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/GeneralComponents/popup.module.scss";
import validator from "validator";
function PopUp({ heading, saveinput, settoastdata }) {
  const [data, setdata] = useState("");

  useEffect(() => {
    setdata(localStorage.getItem("email"));
  }, []);
  return (
    <div className={styles.popup}>
      <div className={styles.background}></div>
      <div className={styles.box}>
        <h2>{heading}</h2>
        <input
          type="text"
          value={data}
          onChange={(e) => setdata(e.target.value)}
        />
        <div
          className={styles.submit}
          onClick={() => {
            if (validator.isEmail(data)) {
              localStorage.setItem("email", data);
              saveinput(data);
            } else {
              settoastdata({
                show: true,
                type: "error",
                msg: "Enter valid Email",
              });
            }
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
}

export default PopUp;
