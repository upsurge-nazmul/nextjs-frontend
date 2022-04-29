import styles from "../../../styles/StockSimulator/chartDuration.module.scss";

export default function ChartDuration({ value, action, options = [] }) {
  const handleDurationSelection = (value) => {
    action(value);
  };

  return (
    <div className={styles.durationArea}>
      {options.map((duration, i) => {
        return (
          <div key={i} className={styles.durationItem}>
            <button
              onClick={() => handleDurationSelection(duration.name)}
              className={value === duration.name ? styles.active : ""}
            >
              {duration.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
