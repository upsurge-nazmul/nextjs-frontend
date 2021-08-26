import React from "react";
import styles from "../../styles/kidDashboard/tribe.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

export default function TribeComponent({ data }) {
  const demokiddata = {
    image:
      "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    name: "Mehra Tribe",
    members: "Aadvik, Pihu & 6 others",
  };
  return (
    <div className={styles.tribe}>
      <img src={demokiddata.image} alt="" className={styles.grpimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{demokiddata.name}</p>
        <p className={styles.points}>{demokiddata.members}</p>
      </div>
      <div className={styles.msg}>
        <ChatSvg clr="#4166EB" />
      </div>
    </div>
  );
}
