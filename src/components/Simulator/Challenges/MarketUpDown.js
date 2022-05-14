import { useState } from "react";
import styles from "../../../styles/StockSimulator/marketUpDown.module.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function MarketUpDown() {
  const [selected, setSelected] = useState();

  const handleSelect = (value) => {
    setSelected(value);
    console.log("selected", value);
  };

  return (
    <div className={styles.marketUpDown}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Market Up or Down</div>
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
            className={selected === "up" ? styles.activeUp : styles.upOption}
          >
            <button onClick={() => handleSelect("up")}>
              <CheckCircleIcon />
              <div className={styles.name}>Market will go up</div>
              <ArrowDropUpIcon />
            </button>
          </div>
          <div className={styles.or}>OR</div>
          <div
            className={
              selected === "down" ? styles.activeDown : styles.downOption
            }
          >
            <button onClick={() => handleSelect("down")}>
              <CheckCircleIcon />
              <div className={styles.name}>Market will go down</div>
              <ArrowDropDownIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
