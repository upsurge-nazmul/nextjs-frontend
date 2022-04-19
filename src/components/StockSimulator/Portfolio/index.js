import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Description from "./Description";
import Holdings from "./Holdings";

export default function Portfolio({ userData, actionMethod }) {
  return (
    <div className={styles.portfolio}>
      <div className={styles.main}>
        <p className={styles.heading}>Portfolio</p>
        <Holdings userData={userData} />
        <Description userData={userData} />
      </div>
      <div className={styles.footerArea}>
        <img
          className={styles.homebtn}
          onClick={actionMethod}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
