import React, { useState } from "react";
import styles from "../../styles/MoneyAce/rewardbox.module.scss";

export default function RewardBox({ data, index, opened }) {
  const texts = [
    "₹200",
    "5% Morale Boost",
    "10% investment return boost",
    "10% income boost",
    "1 extra stamina",
    "Rs. 2000",
    "ALL Prizes for day 1-6",
  ];
  const [hovering, sethovering] = useState(false);
  return (
    <div
      className={styles.day}
      onClick={() => sethovering(!hovering)}
      onMouseEnter={() => sethovering(true)}
      onMouseLeave={() => sethovering(false)}
    >
      {hovering && <div className={styles.hoverboard}>{texts[index]}</div>}
      <img
        src={
          index >= data?.reward
            ? index === data?.reward && opened
              ? "https://i.ibb.co/C5FqHWd/toppng-com-opened-red-gift-box-600x319.png"
              : "https://i.ibb.co/2MgB40Q/toppng-com-ift-box-in-red-png-clipart-gift-box-clipart-2371x2679.png"
            : "https://i.ibb.co/C5FqHWd/toppng-com-opened-red-gift-box-600x319.png"
        }
        alt=""
      />
      <p>Day {index + 1}</p>
    </div>
  );
}
