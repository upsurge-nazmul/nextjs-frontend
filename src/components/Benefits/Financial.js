import React from "react";
import styles from "../../styles/Benefits/financial.module.scss";
export default function Financial({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.blue}></div>
        <div className={styles.white}></div>
        <div className={styles.yellow}></div>
        <div className={styles.left}>
          <p className={styles.heading}>
            Kickstart your kid’s financial journey
          </p>
          <p className={styles.subheading}>
            {`Financial literacy is a life-skill and the earlier your children start, the easier it will be for them to achieve their financial goals. Through our games, courses and live classes, all designed by experts, they will understand money, saving, investing and entrepreneurship like never before!`}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <img src="https://i.ibb.co/X2fdvVq/Untitled-design-23.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
