import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/dailyreward.module.scss";
export default function DailyReward({ setshowdaily, data, setmoneyacedata }) {
  const [opened, setopened] = useState(false);
  return (
    <div className={styles.profile}>
      <div className={styles.bg} />

      <div className={styles.main}>
        <p className={styles.heading}>Daily Reward</p>
        <div className={styles.divmain}>
          <div className={styles.clickable}>
            {!opened ? (
              <div className={styles.gift} onClick={() => setopened(true)}>
                <img
                  src="https://i.ibb.co/WVBQYjx/Reward-Icon.png"
                  alt=""
                  className={styles.giftimage}
                />
                <img
                  src={
                    "https://i.ibb.co/wKpX35C/119-1190624-tck-design-logo-sunburst-black-white-starburst-throw.png"
                  }
                  alt=""
                  className={styles.sunburst}
                />
              </div>
            ) : (
              <div className={styles.giftopened}>
                <p className={styles.head}>₹{data?.reward}</p>
                <p className={styles.subhead}>
                  Yay! you have won ₹{data?.reward}
                </p>
              </div>
            )}
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => {
            setmoneyacedata((prev) => ({
              ...prev,
              account_balance:
                Number(prev.account_balance) + Number(data.reward),
            }));
            setshowdaily(false);
          }}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
