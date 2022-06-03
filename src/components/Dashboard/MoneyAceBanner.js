import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Dashboard/moneyacebanner.module.scss";

export default function MoneyAceBanner({ type }) {
  const router = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <img src="/images/games/MoneyAce.png" alt="" />
      </div>
      <div className={styles.right}>
        <p className={styles.name}>Money Ace</p>
        <p className={styles.description}>
          {`Our flagship game, Money Ace is India’s first game to give children the chance to understand life, personal finance & investing in an age-relevant manner. Do your chores, take-up side gigs, save money, upskill & invest across 5 FDs, Stock Markets, Gold, Real Estate & Crypto! The users who create the most wealth every week get great rewards!`}
        </p>
        {/* {type === "k" && (
          <p
            className={styles.play}
            onClick={() => router.push("/dashboard/" + type + "/moneyace")}
          >
            Play
          </p>
        )} */}
      </div>
    </div>
  );
}
