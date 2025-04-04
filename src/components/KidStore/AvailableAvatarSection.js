import React from "react";
import styles from "../../styles/KidStore/AvailableAvatarSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Avatar from "./Avatar";

export default function AvailableAvatarSection({
  setshowmodal,
  avatars,
  setdata,
}) {
  return (
    <div className={styles.avatarSection}>
      <h2 className={styles.heading}>
        Available Avatars
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {avatars.map((item, index) => (
          <Avatar
            key={"avatatr" + index}
            data={item}
            setdata={setdata}
            setshowmodal={setshowmodal}
          />
        ))}
      </div>
    </div>
  );
}
