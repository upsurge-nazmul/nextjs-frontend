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
            {`Kickstart your child’s financial and entrepreneurial journey with our proprietary product designed by finance professionals, 3x entrepreneurs and experiential learning experts. Kids will learn through appropriately designed content and then apply these learnings to fun games to learn. Games will have weekly and monthly leaderboards, just like fantasy sports, which will promote competitive capital in children, and give them a chance to win relevant rewards.`}
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
