import styles from "../../../styles/StockSimulator/bitcoinPriceEst.module.scss";

export default function BitcoinPriceEst() {
  return (
    <div className={styles.bitcoinPriceEst}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Bitcoin Price Estimate</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
        </div>
      </div>
    </div>
  );
}
