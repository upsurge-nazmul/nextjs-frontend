import React from "react";
import styles from "../../styles/kidDashboard/tribe.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

export default function TribeCard({ data, onClick }) {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
    name: "Mehra Tribe",
    members: "Aadvik, Pihu & 6 others",
  };
  return (
    <div className={styles.tribe}>
      <img
        onClick={onClick}
        src={
          data.tribe_img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
        }
        alt=""
        className={styles.grpimg}
      />
      <div className={styles.nameandpoints} onClick={onClick}>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.points}>
          {data?.description.length > 60
            ? data.description.substring(0, 60) + "..."
            : ""}
        </p>
      </div>
      <div className={styles.chatbtn}>
        Chat
        <ChatSvg clr="#ffffff" />
      </div>
    </div>
  );
}
