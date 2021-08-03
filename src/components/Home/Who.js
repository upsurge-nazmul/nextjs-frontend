import React from "react";
import styles from "../../styles/Home/who.module.scss";
import whoimage from "../../assets/who/who.png";
function Who() {
  return (
    <div className={styles.whoSection}>
      <div className={styles.heading}>
        <span className={styles.highlight}>
          Who <div className={styles.underline}></div>{" "}
        </span>
        are we ?
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>
            We are a{" "}
            <span>
              financial literacy and entrepreneurship development program
            </span>
            for children between the ages of 7 to 18.
          </p>
          <p>
            We believe in practical learning and have developed our own
            curriculums and games to{" "}
            <span>
              make learning fun, effective and rewarding for children.
            </span>
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <img src={whoimage.src} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Who;
