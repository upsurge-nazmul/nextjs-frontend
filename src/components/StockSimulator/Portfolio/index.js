import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Description from "./Description";
import Holdings from "./Holdings";

export default function Portfolio({ actionMethod }) {
  return (
    <div className={styles.portfolio}>
      <div className={styles.main}>
        <p className={styles.heading}>Portfolio</p>
        <Holdings />
        <Description />
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
