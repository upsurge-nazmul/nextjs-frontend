import styles from "../../../styles/StockSimulator/home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <div className={styles.topLeft}>This is top left</div>
        <div className={styles.bottomLeft}>This is bottom left</div>
      </div>
      <div className={styles.right}>
        <div className={styles.topRight}>This is top right</div>
        <div className={styles.bottomRight}>This is bottom right</div>
      </div>
    </div>
  );
}
