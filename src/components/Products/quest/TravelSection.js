import Image from "next/image";
import React from "react";
import styles from "../../../styles/Products/questsections.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const TravelSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Travel the world with Kiara to learn about evolution of money and
        currencies.
      </h2>
      <div className={styles.bannerContainer}>
        <Image
          src={"/images/quest/travel-section.png"}
          alt="Travel"
          layout="fill"
          className={styles.banner}
        />
      </div>
      <span className={styles.text}>Loved it?</span>
      <button className={styles.button}>
        Watch More
        <PlayArrowIcon />
      </button>
    </div>
  );
};

export default TravelSection;
