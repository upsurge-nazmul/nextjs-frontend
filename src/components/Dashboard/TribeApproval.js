import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/tribeApproval.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

export default function TribeApproval({ data }) {
  const [showmenu, setshowmenu] = useState(false);
  const router = useRouter();
  const demotribedata = {
    name: "Demo Tribe",
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    task: "Add Pulkit",
    by: "Requested by Astha",
    to: "",
    time: "Due in 3 days",
    status: "pending",
  };
  let currenttime = new Date().getTime();
  let due_date = new Date(Number(data.due_date)).getTime();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((due_date - currenttime) / oneDay));
  due_date = `Due in ${diffDays} days`;
  useEffect(() => {
    if (showmenu) document.addEventListener("mousedown", getifclickedoutside);
    else document.removeEventListener("mousedown", getifclickedoutside);
    function getifclickedoutside(e) {
      let menu = document.getElementById(`menu-${data.id}`);
      if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
  }, [showmenu]);
  return (
    <div className={styles.tribeApproval}>
      <img
        src={
          data.image ||
          "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{demotribedata.task}</div>
        <div className={styles.to}>{demotribedata.by}</div>
        <p className={styles.mobiletribe}>{demotribedata.name}</p>
      </div>
      <div className={styles.time}>
        <p>{demotribedata.name}</p>
      </div>
      <div className={styles.button}>Approve</div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}
