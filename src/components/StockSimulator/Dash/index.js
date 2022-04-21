import { useState } from "react";
import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";
import ChartOptions from "./ChartOptions";
import Select from "./Select";

const ChartModeOptions = ["candlestick", "line"];

export default function SimulatorDash({
  simulatorDailyData,
  simulatorMonthlyData,
  companyData,
}) {
  const [chartMode, setChartMode] = useState(ChartModeOptions[0]);
  const [selectedCompany, setSelectedCompany] = useState(companyData[0].symbol);

  return (
    <div className={styles.simulatorDash}>
      <div className={styles.dashLeft}>
        <Select
          {...{
            value: selectedCompany,
            setvalue: setSelectedCompany,
            options: companyData,
          }}
        />
        <SimulatorChart
          simulatorMonthlyData={simulatorMonthlyData}
          chartMode={chartMode}
          ChartModeOptions={ChartModeOptions}
          width="95%"
          height="600px"
        />
        <ChartDuration defaultDuration={30} width="95%" />
      </div>
      <div className={styles.dashRight}>
        <CompanyInfo
          selectedCompany={selectedCompany}
          simulatorDailyData={simulatorDailyData}
        />
        <SimulatorOptions />
        <ChartOptions {...{ chartMode, setChartMode, ChartModeOptions }} />
      </div>
    </div>
  );
}
