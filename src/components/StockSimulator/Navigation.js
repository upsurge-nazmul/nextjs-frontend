import styles from "../../styles/StockSimulator/navigations.module.scss";

export default function Navigation({
  options = [],
  action = () => {},
  active = "",
}) {
  return (
    <div className={styles.navigation}>
      {options.length &&
        options.map((item) => {
          return (
            <div
              key={item.value}
              className={
                item.value === active ? styles.activeNav : styles.navItem
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
