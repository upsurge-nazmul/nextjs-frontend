import React, { useState } from "react";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import Avatar from "./Avatar";
import BackButtonSvg from "../../SVGcomponents/BackButtonSvg";

export default function AvatarList({
  avatars,
  handleAvatarClick,
  setShowModal,
}) {
  return (
    <div className={styles.avatarsList}>
      <div className={styles.heading} onClick={() => setShowModal(false)}>
        <p>
          <BackButtonSvg />
          Available Avatars
        </p>
      </div>
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
