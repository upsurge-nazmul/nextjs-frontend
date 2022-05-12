import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/dailyreward.module.scss";
import RewardBox from "./RewardBox";
export default function DailyReward({ setshowdaily, data, setmoneyacedata }) {
  const [opened, setopened] = useState(false);
  const arr = [0, 1, 2, 3, 4, 5, 6];
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
                  src="https://i.ibb.co/2MgB40Q/toppng-com-ift-box-in-red-png-clipart-gift-box-clipart-2371x2679.png"
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
                <p className={styles.head}>{data?.text}</p>
                <p className={styles.subhead}>Yay! you have won {data?.text}</p>
                <img
                  src={
                    "https://i.ibb.co/wKpX35C/119-1190624-tck-design-logo-sunburst-black-white-starburst-throw.png"
                  }
                  alt=""
                  className={styles.sunburst}
                />
              </div>
            )}
          </div>
          <div className={styles.bottombar}>
            {arr.map((item) => {
              return (
                <RewardBox
                  data={data}
                  key={"reward" + item}
                  index={item}
                  opened={opened}
                />
              );
            })}
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => {
            if (
              Number(data.reward) === 0 ||
              Number(data.reward) === 5 ||
              Number(data.reward) === 6
            ) {
              setmoneyacedata((prev) => ({
                ...prev,
                account_balance: prev.is_account_open
                  ? Number(prev.account_balance) +
                    (Number(data.reward) === 0
                      ? 200
                      : Number(data.reward) === 5
                      ? 2000
                      : 2200)
                  : Number(prev.account_balance),
                inhand_money: prev.is_account_open
                  ? Number(prev.inhand_money)
                  : Number(prev.inhand_money) +
                    (Number(data.reward) === 0
                      ? 200
                      : Number(data.reward) === 5
                      ? 2000
                      : 2200),
              }));
            }
            setshowdaily(false);
          }}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
