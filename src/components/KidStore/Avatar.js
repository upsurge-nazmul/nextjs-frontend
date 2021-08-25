import React from "react";
import styles from "../../styles/KidStore/avatar.module.scss";

export default function Avatar({ setshowmodal }) {
  return (
    <div className={styles.avatar} onClick={() => setshowmodal(true)}>
      <img
        src="https://static.wikia.nocookie.net/f5bef280-f4ab-42a1-b7fe-378c176a4da1/thumbnail-down/width/1280/height/720"
        alt=""
      />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>Avatar</p>
        <p className={styles.point}>200 Points</p>
      </div>
    </div>
  );
}
