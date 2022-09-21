import React from "react";
import styles from "../../styles/kidDashboard/tribe.module.scss";
import ChatSvg from "../SVGcomponents/ChatSvg";

export default function TribeCard({ data, onClick }) {
  return (
    <div className={styles.tribe}>
      <img
        onClick={onClick}
        src={
          data.tribe_img_url || "https://imgcdn.upsurge.in/images/default-avatar.png"
        }
        alt=""
        className={styles.grpimg}
      />
      <div className={styles.nameandpoints} onClick={onClick}>
        <p className={styles.name}>
          {data.name} {data.pending && "(pending)"}
        </p>
        <p className={styles.points}>
          {data?.description?.length > 60
            ? data.description?.substring(0, 60) + "..."
            : data.description}
        </p>
      </div>
      {/* <div className={styles.chatbtn}>
        Chat
        <ChatSvg clr="#ffffff" />
      </div> */}
    </div>
  );
}
