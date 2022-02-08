import React from "react";
import styles from "../../styles/GeneralComponents/avatarselector.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
export default function AvatarSelector({ avatars, setvalue, value, setshow }) {
  return (
    <div className={styles.avatarselector}>
      <div className={styles.background} onClick={() => setshow(false)} />
      <div className={styles.main}>
        <p className={styles.heading}>Select your avatar</p>
        <div className={styles.wrapper}>
          {avatars.map((avatar) => {
            return (
              <div
                className={styles.avatar}
                key={avatar}
                onClick={() => {
                  setvalue("/images/avatars/" + avatar + ".png");
                  setshow(false);
                }}
              >
                {value === "/images/avatars/" + avatar + ".png" && (
                  <div className={styles.selected}>
                    <TickSvg className={styles.tick} />
                  </div>
                )}
                <img src={"/images/avatars/" + avatar + ".png"} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
