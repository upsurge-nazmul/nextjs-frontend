import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../Toast";
import styles from "../../styles/Dashboard/invitecomponent.module.scss";
import Refer from "../WaitlistDashboard/Refer"

function InviteComponent({
showinvite,
setshowinvite,
}) {
const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  return (
    <div className={styles.container}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showinvite ? (
            <div className={styles.inviteContainerWrapper}>
            <div className={styles.inviteBackground} onClick={()=>{setshowinvite(false)}}>
            </div>
            <div className={styles.inviteContainer}>
            <Refer settoastdata={settoastdata} />
            </div>
            </div>
        ):null}
      </AnimatePresence>
    </div>
  );
}

export default InviteComponent;
