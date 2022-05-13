import styles from "../../../styles/StockSimulator/topgainer.module.scss";

export default function Topgainer({ list }) {
  console.log("!!!!!!!!!!", list);

  return (
    <div className={styles.topgainer}>
      <h1>Top Gainer</h1>
    </div>
  );
}
