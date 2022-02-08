import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/Main";
import styles from "../styles/GeneralComponents/notitoast.module.scss";
export default function NotificationComponent() {
  const { notification, setNotification } = useContext(MainContext);
  const [showtoast, setshowtoast] = useState(false);
  const [task, settask] = useState(null);
  useEffect(() => {
    if (!notification?.show) return;
    clearTimeout(task);
    setshowtoast(true);
    settask(
      setTimeout(() => {
        setshowtoast(false);
        setNotification("");
      }, 2500)
    );
  }, [notification]);
  return (
    <AnimatePresence>
      {showtoast && (
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 300 }}
          className={styles.toast}
        >
          <div className={styles.box}>
            {notification.data.sender_img_url && (
              <img src={notification.data.sender_img_url} alt="" />
            )}
            <div className={styles.right}>
              <p className={styles.title}>
                {notification.data.sender_name
                  ? notification.data.sender_name
                  : notification.title}
              </p>
              <p className={styles.msg}>
                {notification.data.msg
                  ? notification.data.msg
                  : notification.body}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
