import styles from "../../styles/StockSimulator/tabs.module.scss";

export default function Navigation({
  options = [],
  action = () => {},
  active = "",
}) {
  return (
    <div className={styles.squareNavigation}>
      {options.length &&
        options.map((item) => {
          return (
            <div
              key={item.value}
              className={
                item.value === active ? styles.activeSqNav : styles.squareNav
              }
              onClick={() => action(item.value)}
            >
              <div className={styles.icon}>{item.icon}</div>
            </div>
          );
        })}
    </div>
  );
}
