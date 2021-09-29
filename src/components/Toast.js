import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/GeneralComponents/toast.module.scss";

function Toast({ data }) {
  const [task, settask] = useState(null);
  const [showtoast, setshowtoast] = useState(false);
  useEffect(() => {
    if (!data.show) return;
    clearTimeout(task);
    setshowtoast(true);
    settask(
      setTimeout(() => {
        setshowtoast(false);
      }, 2500)
    );
  }, [data]);
  return (
    <AnimatePresence>
      {showtoast && (
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 300 }}
          className={styles.toast}
        >
          <p
            className={` ${
              data.type === "success" ? styles.success : styles.error
            }`}
          >
            {data.msg}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
