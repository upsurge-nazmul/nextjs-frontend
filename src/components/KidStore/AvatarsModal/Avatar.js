import React from "react";
import styles from "../../../styles/KidStore/avatar.module.scss";

export default function Avatar({ data, handleAvatarClick }) {
  return (
    <div
      className={styles.avatar}
      onClick={() =>
        handleAvatarClick({
          name: data.name,
          price: data.points,
          avatar_id: data.id,
        })
      }
    >
      <img src={data.img_url} alt="" />
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.point}>{data.points} Unicoins</p>
      </div>
    </div>
  );
}
