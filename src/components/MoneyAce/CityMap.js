import React from "react";
import styles from "../../styles/MoneyAce/citymap.module.scss";
import MotelSvg from "../SVGcomponents/MoneyAce/MotelSvg";
import RoadSvg from "../SVGcomponents/MoneyAce/RoadSvg";
import TrainSvg from "../SVGcomponents/MoneyAce/TrainSvg";
import BankSvg from "../SVGcomponents/MoneyAce/BankSvg";
import Hub from "../SVGcomponents/MoneyAce/Hub";
import BG from "../SVGcomponents/MoneyAce/BG";
import SchoolSvg from "../SVGcomponents/MoneyAce/SchoolSvg";
import FishPondSvg from "../SVGcomponents/MoneyAce/FishPondSvg";
import SuperMarketSvg from "../SVGcomponents/MoneyAce/SuperMarketSvg";
import OfficeSvg from "../SVGcomponents/MoneyAce/OfficeSvg";
import FarmSvg from "../SVGcomponents/MoneyAce/FarmSvg";
import HouseSvg from "../SVGcomponents/MoneyAce/HouseSvg";

export default function CityMap() {
  return (
    <div className={styles.citymap}>
      <div className={styles.wrapper}>
        <BankSvg className={`${styles.bank} ${styles.icon}`} />
        <Hub className={`${styles.hub} ${styles.icon}`} />
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
