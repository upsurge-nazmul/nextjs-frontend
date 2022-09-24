import React, { useState } from "react";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import AvatarCarousel from "./AvatarCarousel";
import HeadingArrow from "../../SVGcomponents/HeadingArrow";

export default function AvatarsModal({ avatars }) {
  return (
    <div className={styles.avatarsModal}>
      <div className={styles.heading}>
        Available Avatars
        <HeadingArrow />
      </div>
      <div className={styles.container}>
        <div className={styles.avatars}>
          <AvatarCarousel avatars={avatars} />
        </div>
      </div>
    </div>
  );
}
