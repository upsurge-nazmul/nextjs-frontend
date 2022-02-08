import React from "react";
import styles from "../../styles/GeneralComponents/avatarselector.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
export default function AvatarSelector({ avatars, setvalue, value }) {
  return (
    <div className={styles.avatarselector}>
      <div className={styles.background}></div>
      <div className={styles.main}>
        <p className={styles.heading}>Select your avatar</p>
        <div className={styles.wrapper}>
          {avatars.map((avatar) => {
            <div className={styles.avatar}>
              {value === "avatar" && (
                <div className={styles.selected}>
                  <TickSvg />
                </div>
              )}
              <img src={avatar} alt="" />
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
