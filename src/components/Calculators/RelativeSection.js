import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import { Calc_Data } from "../../static_data/Calc_Data";
import styles from "../../styles/Calculators/relativesection.module.scss";

export default function RelativeSection({ cards, mobileApp }) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
  function relate(item) {
    if (mobileApp) {
      router.push(`/mobilecalcs/${item}`);
    } else router.push(`/calculators/${item}`);
    let x = document.getElementById("home-page-header");
    x.scrollIntoView();
  }
  return (
    <div className={`${styles.main} ${theme === "dark" && styles.darkstyles}`}>
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
