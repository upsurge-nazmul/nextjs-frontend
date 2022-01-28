import React from "react";
import styles from "../../styles/kidDashboard/tribe.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

export default function TribeCard({ data }) {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
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
      <div className={styles.chatbtn}>
        Chat
        <ChatSvg clr="#ffffff" />
      </div>
    </div>
  );
}
