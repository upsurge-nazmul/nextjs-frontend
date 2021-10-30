import React from "react";
import styles from "../../styles/Benefits/rewardssection.module.scss";
import Image from "next/image";
export default function RewardsSection({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.wrap}>
            <Image
              layout="fill"
              objectFit="cover"
              src="https://i.ibb.co/JQSknVG/coinfalling.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.left}>
          <p className={styles.heading}>Reward your kids</p>
          <p className={styles.subheading}>
            {`Rewards are an important part of the developmental cycle for children. To encourage good financial habits, and ensure that children understand the importance of financial literacy, we have gamified the entire platform! Children will be awarded Unicoins based on their performance in the quests and games, and by completing chores assigned by their parents. These can then be redeemed against real prizes from popular Indian brands from our store!`}
          </p>
        </div>
      </div>
    </div>
  );
}
