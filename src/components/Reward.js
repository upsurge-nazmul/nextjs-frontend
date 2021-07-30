import React from "react";
import gems from "../assets/rewards/gem.png";
import points from "../assets/rewards/points.png";
import styles from "../styles/GeneralComponents/reward.module.scss";
function Reward({ type, value }) {
  return (
    <div className={styles.rewardComponent}>
      <img src={type === "gem" ? gems.src : points.src} alt="" />
      <p>{`${value} ${type === "gem" ? "Gems" : "Reward Points"}`}</p>
    </div>
  );
}

export default Reward;
