import React from "react";
import styles from "../../styles/KidStore/avatar.module.scss";

export default function Avatar({ setshowmodal, data }) {
  return (
    <div className={styles.avatar} onClick={() => setshowmodal(true)}>
      <img src={data.img_url} alt="" />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.point}>{data.points} Points</p>
      </div>
    </div>
  );
}
