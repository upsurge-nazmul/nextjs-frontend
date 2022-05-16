import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/stockXStockY.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function StockXStockY({ token, simulatorType }) {
  const [selected, setSelected] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    async function fetchStockXY() {
      let stocks = await SimulatorApis.getStockXY({
        payload: {},
        token,
        type: simulatorType,
      });
      if (stocks.data && stocks.data.success) {
        const { x, y } = stocks.data.data;
        setX(x);
        setY(y);
      }
    }
    fetchStockXY();
  }, []);

  useEffect(() => {
    async function fetchStockXYAnswer() {
      let stocks = await SimulatorApis.getStockXYAnswer({
        payload: {},
        token,
        type: simulatorType,
      });
      if (stocks.data && stocks.data.success) {
        const { answer } = stocks.data.data;
        if (answer) setSelected(answer);
      }
    }
    fetchStockXYAnswer();
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    console.log("selected", value);
  };

  return (
    <div className={styles.stockXStockY}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Stock X or Stock Y</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
        </div>
      </div>
      <div className={styles.bottomSection}>
        {x && y ? (
          <div className={styles.optionsArea}>
            <div
              className={selected === "x" ? styles.activeOption : styles.option}
            >
              <button onClick={() => handleSelect("x")}>
                <div className={styles.checkIcon}>
                  {selected === "x" ? <CheckCircleIcon /> : ""}
                </div>
                <div className={styles.name}>{x.name}</div>
                <div>{`₹${parseFloat(x.close).toFixed(2)}`}</div>
              </button>
            </div>
            <div className={styles.or}>OR</div>
            <div
              className={selected === "y" ? styles.activeOption : styles.option}
            >
              <button onClick={() => handleSelect("y")}>
                <div className={styles.checkIcon}>
                  {selected === "y" ? <CheckCircleIcon /> : ""}
                </div>
                <div className={styles.name}>{y.name}</div>
                <div>{`₹${parseFloat(y.close).toFixed(2)}`}</div>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
