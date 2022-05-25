import React from "react";
import UblBanner from "../../components/SVGcomponents/UBL/UblBanner";
import styles from "../../styles/ubl/ubl.module.scss";
export default function UblPage() {
  return (
    <div className={styles.ubl}>
      <div className={styles.banner}>
        <UblBanner className={styles.bannerbg} />

        <div className={styles.center}>
          <div className={styles.sponsor}>
            Lead Sponsor
            <img
              className={styles.sponsorlogo}
              src="https://i.ibb.co/xq11YDB/jcbl-500x500.png"
              alt=""
            />
          </div>
          <p className={styles.herotext}>UPSURGE</p>
          <p className={styles.herotext}>BUSINESS</p>
          <p className={styles.herotext}>LEAGUE</p>
          <p className={styles.bluehero}>2022</p>
        </div>
      </div>
    </div>
  );
}
