import { useState, useEffect } from "react";
import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";
import ChartOptions from "./ChartOptions";
import CompanySelection from "./CompanySelection";

const ChartModeOptions = ["candlestick", "line"];
const ChartDurations = [
  { name: "1 Month", value: 30 },
  { name: "3 Months", value: 90 },
  { name: "6 Months", value: 180 },
  { name: "1 Year", value: 365 },
  { name: "5 Years", value: 1825 },
];

export default function SimulatorDash({
  simulatorDailyData,
  simulatorMonthlyData,
  companyData,
  selectedSymbol,
  setSelectedSymbol,
}) {
  const [chartMode, setChartMode] = useState(ChartModeOptions[0]);
  const [selectedDuration, setSelectedDuration] = useState(
    ChartDurations[0].value
  );
  const [selectedCompany, setSelectedCompany] = useState(simulatorDailyData[0]);

  useEffect(() => {
    if (simulatorDailyData.length) {
      let currentCompany = simulatorDailyData.find(
        (item) => item.Symbol === selectedSymbol
      );
      setSelectedCompany(currentCompany);
    }
  }, [selectedSymbol, simulatorDailyData]);

  return (
    <div className={styles.simulatorDash}>
      <div className={styles.dashLeft}>
        <div className={styles.chartOptionArea}>
          <div className={styles.selectArea}>
            <CompanySelection
              {...{
                value: selectedSymbol,
                setvalue: setSelectedSymbol,
                options: companyData,
              }}
            />
          </div>
          <div className={styles.switchArea}>
            <ChartOptions {...{ chartMode, setChartMode, ChartModeOptions }} />
          </div>
        </div>
        <SimulatorChart
          simulatorMonthlyData={simulatorMonthlyData}
          chartMode={chartMode}
          ChartModeOptions={ChartModeOptions}
          width="95%"
          height="600px"
        />
        <ChartDuration
          value={selectedDuration}
          action={setSelectedDuration}
          options={ChartDurations}
          width="95%"
        />
      </div>
      <div className={styles.dashRight}>
        {selectedCompany && <CompanyInfo companyInfo={selectedCompany} />}
        {selectedCompany && (
          <SimulatorOptions companyDetails={selectedCompany} />
        )}
      </div>
    </div>
  );
}
