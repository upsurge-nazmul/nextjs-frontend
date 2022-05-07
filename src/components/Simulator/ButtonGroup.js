import styles from "../../styles/StockSimulator/buttonGroup.module.scss";

export default function ChartDuration({ value, action, options = [] }) {
  const handleDurationSelection = (value) => {
    action(value);
  };

  return (
    <div className={styles.groupArea}>
      {options.map((duration, i) => {
        return (
          <div key={i} className={styles.buttonItem}>
            <button
              onClick={() => handleDurationSelection(duration.value)}
              className={value === duration.value ? styles.active : ""}
            >
              {duration.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
