import SimulatorChart from "./SimulatorChart";
import styles from "../../../styles/StockSimulator/dash.module.scss";
import simulatorData from "./data.json";
import SimulatorOptions from "./Options";

export default function SimulatorDash() {
  return (
    <div className={styles.simulatorDash}>
      <SimulatorChart simulatorData={simulatorData} width="80%" />
      <SimulatorOptions />
    </div>
  );
}
