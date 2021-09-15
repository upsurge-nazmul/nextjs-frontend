import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/chorecomponent.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";

function ChoreComponent({ data }) {
  const [showmenu, setshowmenu] = useState(false);
  const router = useRouter();
  const demoChore = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    task: "Prepare Monthly Budget",
    to: "Assigned to Pulkit",
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
    <div className={styles.choreComponent}>
      <img
        src={
          data.image ||
          "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{data.title}</div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />

        <p>{due_date}</p>
      </div>
      <div className={styles.completionIcon}>
        {data.completion === "completed" ? (
          <CompletedSvg />
        ) : data.completion === "pending" ? (
          <PendingSvg />
        ) : null}
      </div>
      <div className={styles.button}>Nudge</div>

      <div className={styles.more} onClick={() => setshowmenu(!showmenu)}>
        {showmenu ? (
          <div className={styles.menu} id={`menu-${data.id}`}>
            <p
              className={styles.menutab}
              onClick={() =>
                router.push({
                  pathname: "/managechore/edit",
                  asPath: "/managechore/edit",
                  query: {
                    state: JSON.stringify({ data: data, isineditmode: true }),
                  },
                })
              }
            >
              Edit
            </p>
          </div>
        ) : null}
        <MenuSvg />
      </div>
    </div>
  );
}

export default ChoreComponent;
