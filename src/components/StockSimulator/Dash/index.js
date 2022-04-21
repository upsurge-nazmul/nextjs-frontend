import { useState, useEffect } from "react";
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
  const [selectedSymbol, setSelectedSymbol] = useState(companyData[0].symbol);
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
            <Select
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
        <ChartDuration defaultDuration={30} width="95%" />
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
