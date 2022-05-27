import styles from "../../styles/StockSimulator/noData.module.scss";
import Jasper from "../SVGcomponents/Jasper";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";

export default function NoData({ message = "There is no data", size = "big" }) {
  return (
    <div className={styles.fillspace}>
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <Jasper className={styles.mascot} />
      <p>{message}</p>
    </div>
  );
}
