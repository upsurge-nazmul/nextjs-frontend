import React from "react";
import styles from "../../styles/Notifications/message.module.scss";
function Message() {
  const demoMessage = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    name: "Pulkit Mehra",
    msg: "Hello guys, we have discussed about ...",
    time: "16.04",
  };
  return (
    <div className={styles.message}>
      <img src={demoMessage.image} alt="" />
      <div className={styles.nameandmsg}>
        <div className={styles.name}>{demoMessage.name}</div>
        <div className={styles.msg}>{demoMessage.msg}</div>
      </div>

      <p className={styles.time}>{demoMessage.time}</p>
    </div>
  );
}

export default Message;
