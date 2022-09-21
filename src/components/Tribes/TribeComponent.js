import React from "react";
import styles from "../../styles/kidDashboard/tribe.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

export default function TribeComponent({ data }) {
  const demokiddata = {
    image:
      "https://imgcdn.upsurge.in/images/unsp/photo-1509343256512-d77a5cb3791b.avif",
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
