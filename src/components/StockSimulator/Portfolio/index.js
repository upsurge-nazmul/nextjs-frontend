import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Description from "./Description";
import Holdings from "./Holdings";
import Performance from "./Performance";

export default function Portfolio({ userData, actionMethod }) {
  return (
    <div className={styles.portfolio}>
      <div className={styles.main}>
        <div className={styles.left}>
          <Holdings userData={userData} />
          <Description userData={userData} />
        </div>
        <div className={styles.right}>
          <Performance />
        </div>
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
