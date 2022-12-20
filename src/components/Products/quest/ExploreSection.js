import React from "react";
import styles from "../../../styles/Products/questsections.module.scss";
const ExploreSection = () => {
  return (
    <div className={styles.container}>
      <h2>Kids see fun, Parent see progress</h2>
      <ul className={styles.listContainer}>
        <li className={styles.listWrap}>
          Discover a world full of games, quizzes and activities for children to
          make them money-smart.
        </li>
        <li className={styles.listWrap}>
          Provides children with a defined path and an ultimate completion goal.
        </li>
        <li className={styles.listWrap}>
          Earn UniCoins on the way and redeem it against brands like Amazon,
          Swiggy, Flipkart, and more.
        </li>
        <li className={styles.listWrap}>
          Receive detailed course information and updates to monitor your
          child&apos;s progress.
        </li>
        <li className={styles.listWrap}>
          Enjoy engaging, collaborative, and amusing activities with your
          family.
        </li>
      </ul>
      <button className={styles.button}>Explore for FREE</button>
    </div>
  );
};

export default ExploreSection;
