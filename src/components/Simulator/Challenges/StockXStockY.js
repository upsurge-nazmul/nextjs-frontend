import { useState } from "react";
import styles from "../../../styles/StockSimulator/stockXStockY.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function StockXStockY() {
  const [selected, setSelected] = useState();

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
        <div className={styles.optionsArea}>
          <div
            className={selected === "up" ? styles.activeOption : styles.option}
          >
            <button onClick={() => handleSelect("up")}>
              <div className={styles.checkIcon}>
                {selected === "up" ? <CheckCircleIcon /> : ""}
              </div>
              <div className={styles.name}>First Company Name</div>
              <div>₹567.23</div>
            </button>
          </div>
          <div className={styles.or}>OR</div>
          <div
            className={
              selected === "down" ? styles.activeOption : styles.option
            }
          >
            <button onClick={() => handleSelect("down")}>
              <div className={styles.checkIcon}>
                {selected === "down" ? <CheckCircleIcon /> : ""}
              </div>
              <div className={styles.name}>Second Company Name</div>
              <div>₹274.56</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
