import styles from "../../../styles/StockSimulator/chartDuration.module.scss";

export default function ChartDuration({ defaultDuration, width }) {
  const durationList = [
    { name: "1 Month", value: 30 },
    { name: "3 Months", value: 90 },
    { name: "6 Months", value: 180 },
    { name: "1 Year", value: 365 },
    { name: "5 Years", value: 1825 },
  ];

  const handleDurationSelection = (value) => {
    console.log(value, " days clicked");
  };

  return (
    <div className={styles.durationArea} style={{ width }}>
      {durationList.map((duration, i) => {
        return (
          <div key={i} className={styles.durationItem}>
            <button
              onClick={() => handleDurationSelection(duration.value)}
              className={
                defaultDuration === duration.value ? styles.active : ""
              }
            >
              {duration.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
