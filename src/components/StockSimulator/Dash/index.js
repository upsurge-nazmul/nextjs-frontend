import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import simulatorData from "./data.json";
import SimulatorOptions from "./Options";
import CompanyInfo from "./CompanyInfo";
import ChartDuration from "./ChartDuration";

export default function SimulatorDash() {
  return (
    <div className={styles.simulatorDash}>
      <div className={styles.dashLeft}>
        <CompanyInfo />
        <SimulatorChart simulatorData={simulatorData} width="100%" />
        <ChartDuration defaultDuration={30} width="100%" />
      </div>
      <div className={styles.dashRight}>
        <SimulatorOptions />
      </div>
    </div>
  );
}
