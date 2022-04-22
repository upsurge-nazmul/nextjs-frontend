import styles from "../../styles/StockSimulator/navigations.module.scss";

export default function Navigation({
  options = [],
  action = () => {},
  active = "",
  shape = "circle",
}) {
  return (
    <div
      className={
        shape === "circle"
          ? styles.navigation
          : shape === "square"
          ? styles.squareNavigation
          : ""
      }
    >
      {options.length &&
        options.map((item) => {
          return (
            <div
              key={item.value}
              className={
                shape === "circle"
                  ? item.value === active
                    ? styles.activeNav
                    : styles.navItem
                  : shape === "square"
                  ? item.value === active
                    ? styles.activeSqNav
                    : styles.squareNav
                  : ""
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
