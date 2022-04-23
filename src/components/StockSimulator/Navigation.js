import Link from "next/link";

import styles from "../../styles/StockSimulator/navigations.module.scss";

export default function Navigation({
  options = [],
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
            <Link
              href={`/dashboard/w/stocksimulator/[page]`}
              as={`/dashboard/w/stocksimulator/${item.value}`}
            >
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
              >
                <div className={styles.icon}>{item.icon}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
