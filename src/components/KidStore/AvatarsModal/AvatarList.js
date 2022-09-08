import React, { useState } from "react";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import AvatarCarousel from "./AvatarCarousel";
import HeadingArrow from "../../SVGcomponents/HeadingArrow";


export default function AvatarList({
  avatars,
}) {
  return (
    <div className={styles.avatarsList}>
      <>
      <div className={styles.heading}>
        <p>
          Available Avatars 
          <HeadingArrow />
        </p>
      </div>
      <div className={styles.avatars}>
        <AvatarCarousel 
        avatars={avatars}
    />
      </div>
    </>
    </div>
  );
}