import { useState } from "react";
import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";
import ChartOptions from "./ChartOptions";

const ChartModeOptions = ["candlestick", "line"];

export default function SimulatorDash({
  simulatorDailyData,
  simulatorMonthlyData,
  companyData,
}) {
  const [chartMode, setChartMode] = useState(ChartModeOptions[0]);

  return (
    <div className={styles.simulatorDash}>
      <div className={styles.dashLeft}>
        <CompanyInfo
          companyData={companyData}
          simulatorDailyData={simulatorDailyData}
          width="100%"
        />
        <SimulatorChart
          simulatorMonthlyData={simulatorMonthlyData}
          chartMode={chartMode}
          ChartModeOptions={ChartModeOptions}
          styles={styles}
        />
        <ChartDuration defaultDuration={30} width="600px" />
      </div>
      <div className={styles.dashRight}>
        <SimulatorOptions />
        <ChartOptions {...{ chartMode, setChartMode, ChartModeOptions }} />
      </div>
    </div>
  );
}
