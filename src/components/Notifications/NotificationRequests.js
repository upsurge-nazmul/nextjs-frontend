import React from "react";
import styles from "../../styles/Notifications/notifications.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

function NotificationRequests() {
  const demoNotification = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    heading: "Buy Minions Avatar",
    sub: "Request by Pulkit",
    time: "2 mins ago",
  };
  return (
    <div className={styles.notifications}>
      <img src={demoNotification.image} alt="" />
      <div className={styles.headingandsub}>
        <div className={styles.heading}>{demoNotification.heading}</div>
        <div className={styles.sub}>{demoNotification.sub}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />

        <p>{demoNotification.time}</p>
      </div>
      <div className={styles.button}>Accept</div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}

export default NotificationRequests;
