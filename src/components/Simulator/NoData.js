import styles from "../../styles/StockSimulator/noData.module.scss";
import NoDataSvg from "../SVGcomponents/StockSimulator/NoDataSvg";

export default function NoData({ message = "There is no data", size = "big" }) {
  return (
    <div
      className={
        size === "small"
          ? styles.noDataSmall
          : size === "medium"
          ? styles.noDataMedium
          : styles.noDataBig
      }
    >
      <NoDataSvg />
      <div className={styles.text}>{message}</div>
    </div>
  );
}
