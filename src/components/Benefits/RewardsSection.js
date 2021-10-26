import React from "react";
import styles from "../../styles/Benefits/rewardssection.module.scss";
export default function RewardsSection({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.background}>
          <img src="/images/coinfalling.png" alt="" />
        </div>
        <div className={styles.left}>
          <p className={styles.heading}>Earn real rewards</p>
          <p className={styles.subheading}>
            {`As adults, when we do our job well or do well on exams, we get rewarded. Then why should we be any different? Whenever your child completes a task, course or game, they get rewarded with Unicoins, which can be redeemed for books, games, vouchers and educational courses from our favorite brands.`}
          </p>
        </div>
      </div>
    </div>
  );
}
