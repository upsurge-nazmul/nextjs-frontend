import styles from "../../../styles/StockSimulator/chartOptions.module.scss";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function ChartOptions({
  chartMode,
  setChartMode,
  ChartModeOptions,
}) {
  return (
    <div className={styles.chartOptionsArea}>
      <div
        className={
          chartMode === ChartModeOptions[0] ? styles.active : styles.button
        }
        onClick={() => setChartMode(ChartModeOptions[0])}
      >
        <CandlestickChartIcon />
      </div>
      <div
        className={
          chartMode === ChartModeOptions[1] ? styles.active : styles.button
        }
        onClick={() => setChartMode(ChartModeOptions[1])}
      >
        <ShowChartIcon />
      </div>
    </div>
  );
}
