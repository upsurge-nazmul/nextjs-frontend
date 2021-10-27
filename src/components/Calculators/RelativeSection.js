import React from "react";
import styles from "../../styles/Calculators/relativesection.module.scss";

export default function RelativeSection({ data, cards }) {
  return (
    <div className={styles.main}>
      <p className={styles.heading}>Related Calculators</p>
      <div className={styles.relativecalcs}>
        {cards.map((item, index) => {
          if (item === "main") {
            return null;
          } else {
            return (
              <div
                key={"relativecalc" + index}
                className={styles.calcCard}
                onClick={() => router.push(`/calculators/${item}`)}
              >
                <img src={data[item].icon} alt="calcicon" />
                <p className={styles.calccardtitle}>{data[item].heading}</p>
                <p className={styles.calccardsubtitle}>
                  {data[item].subheading}
                </p>
                <p className={styles.date}>By Upsurge Team, 5th Aug, 2021</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
