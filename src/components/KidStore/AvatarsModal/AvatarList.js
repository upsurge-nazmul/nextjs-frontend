import React, { useState } from "react";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import Avatar from "./Avatar";

export default function AvatarList({ avatars, handleAvatarClick }) {
  return (
    <div className={styles.avatarsList}>
      <h2 className={styles.heading}>Available Avatars</h2>
      <div className={styles.avatars}>
        {avatars.map((item, index) => (
          <Avatar
            key={"avatatr" + index}
            data={item}
            handleAvatarClick={handleAvatarClick}
          />
        ))}
      </div>
    </div>
  );
}
