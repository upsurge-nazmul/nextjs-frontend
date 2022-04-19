import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";

export default function SimulatorDash({
  simulatorDailyData,
  simulatorMonthlyData,
  companyData,
}) {
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
          height="300px"
          width="600px"
        />
        <ChartDuration defaultDuration={30} width="600px" />
      </div>
      <div className={styles.dashRight}>
        <SimulatorOptions />
      </div>
    </div>
  );
}
