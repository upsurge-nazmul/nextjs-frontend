import React from "react";
import styles from "../../styles/MoneyAce/citymap.module.scss";
import BankSvg from "../SVGcomponents/MoneyAce/BankSvg";
import Hub from "../SVGcomponents/MoneyAce/Hub";
import SchoolSvg from "../SVGcomponents/MoneyAce/SchoolSvg";
import FishPondSvg from "../SVGcomponents/MoneyAce/FishPondSvg";
import SuperMarketSvg from "../SVGcomponents/MoneyAce/SuperMarketSvg";
import OfficeSvg from "../SVGcomponents/MoneyAce/OfficeSvg";
import FarmSvg from "../SVGcomponents/MoneyAce/FarmSvg";
import HouseSvg from "../SVGcomponents/MoneyAce/HouseSvg";

export default function CityMap({ setcurrenttab }) {
  return (
    <div className={styles.citymap}>
      <div className={styles.wrapper}>
        <BankSvg
          onClick={() => setcurrenttab("bank")}
          className={`${styles.bank} ${styles.icon}`}
        />
        <Hub
          className={`${styles.hub} ${styles.icon}`}
          onClick={() => setcurrenttab("investmenthub")}
        />
        <SchoolSvg className={`${styles.school} ${styles.icon}`} />
        <FishPondSvg className={`${styles.fish} ${styles.icon}`} />
        <SuperMarketSvg className={`${styles.supermarket} ${styles.icon}`} />
        <OfficeSvg className={`${styles.office} ${styles.icon}`} />
        <FarmSvg className={`${styles.farm} ${styles.icon}`} />
        <HouseSvg className={`${styles.house} ${styles.icon}`} />
      </div>
    </div>
  );
}
