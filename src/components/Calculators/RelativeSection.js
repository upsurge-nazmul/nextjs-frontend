import { useRouter } from "next/dist/client/router";
import React from "react";
import { Calc_Data } from "../../static_data/Calc_Data";
import styles from "../../styles/Calculators/relativesection.module.scss";

export default function RelativeSection({ cards }) {
  const router = useRouter();
  function relate(item) {
    router.push(`/calculators/${item}`);
    let x = document.getElementById("home-page-header");
    x.scrollIntoView();
  }
  return (
    <div className={styles.main}>
      <p className={styles.heading}>Related Calculators</p>
      <div className={styles.relativecalcs}>
        {cards.map((item, index) => {
          if (item === "main") {
            return null;
          } else {
            if (!Calc_Data[item]) {
              return null;
            }
            return (
              <div
                key={"relativecalc" + index}
                className={styles.calcCard}
                onClick={() => relate(item)}
              >
                <img src={Calc_Data[item].icon} alt="calcicon" />
                <p className={styles.calccardtitle}>
                  {Calc_Data[item]?.heading}
                </p>
                <p className={styles.calccardsubtitle}>
                  {Calc_Data[item]?.subheading}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
