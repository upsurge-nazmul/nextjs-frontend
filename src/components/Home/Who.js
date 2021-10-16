import React from "react";
import styles from "../../styles/Home/who.module.scss";
import whoimage from "../../assets/who/who.png";
function Who() {
  return (
    <div className={styles.whoSection}>
      <div className={styles.heading}>Who are we ?</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>
            We are a financial literacy and entrepreneurship development program
            for children between the ages of 7 to 18.
          </p>
          <p>
            We believe in practical learning and have developed our own
            curriculums and games to make learning fun, effective and rewarding
            for children.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <img src="https://i.ibb.co/Qmckfjh/Untitled-design-54.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Who;
